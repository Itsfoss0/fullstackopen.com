#!/usr/bin/env node

/* Router for the api/blogs endpoint */

const jwt = require('jsonwebtoken');
const tokenExtractor = require('../middleware/auth');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { JWT_SECRET_KEY } = require('./../config/config');

blogRouter.use(tokenExtractor);
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  });
  if (blogs.length > 0) {
    return response.json(blogs);
  }
  return response.status(204).end();
});

blogRouter.get('/:id', async (request, response) => {
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  if (blog) {
    return response.json(blog);
  }
  return response.status(404).json({ error: 'No blog matches that id' });
});

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: 'login and try again' });
  }

  const user = jwt.verify(token, JWT_SECRET_KEY);
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  if (blog.user.toString() === user.userId.toString()) {
    await Blog.findByIdAndDelete(blogId);
    return response.status(204).end();
  }
  return response
    .status(403)
    .json({ error: 'not authorized to delete this blog' });
});

blogRouter.post('/', async (request, response) => {
  const token = request.token;
  if (!token) {
    return response
      .status(403)
      .json({ error: 'unauthorized, login and try again' });
  }
  const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
  const userId = decodedToken.userId;
  const body = request.body;
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    user: userId
  });
  await blog.save();
  const user = await User.findById(userId);
  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  return response.status(201).json(blog);
});

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { likes, title, url } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes, title, url },
    { new: true }
  );
  if (updatedBlog) {
    return response.json(updatedBlog);
  }
  return response.status(404).json({ error: 'No blog with such id exits' });
});

module.exports = blogRouter;
