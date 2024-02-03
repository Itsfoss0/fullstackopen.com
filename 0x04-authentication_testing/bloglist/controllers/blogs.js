#!/usr/bin/env node

/* Router for the api/blogs endpoint */

const { tokenExtractor, userExtractor } = require('../middleware/auth');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.use(tokenExtractor);
blogRouter.use(userExtractor);
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
  const user = request.user;

  if (!token) {
    return response.status(401).json({ error: 'login and try again' });
  }
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  if (!blog) return response.status(404).json({ error: 'blog not found' });
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(blogId);
    return response.status(204).end();
  }
  return response
    .status(403)
    .json({ error: 'not authorized to delete this blog' });
});

blogRouter.post('/', async (request, response) => {
  const token = request.token;
  const requser = request.user;
  if (!token) {
    return response
      .status(403)
      .json({ error: 'unauthorized, login and try again' });
  }
  const body = request.body;
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    user: requser._id
  });
  await blog.save();
  const user = await User.findById(requser._id);
  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  return response.status(201).json(blog);
});

blogRouter.put('/:id', async (request, response) => {
  const token = request.token;
  const user = request.user;
  const { likes, title, url, author } = request.body;
  const blogId = request.params.id;

  if (!token) {
    return response.status(401).json({ error: 'login and try again' });
  }
  const blog = await Blog.findById(blogId);
  if (!blog) return response.status(404).json({ error: 'blog not found' });
  if (blog.user.toString() !== user._id.toString()) {
    return response
      .status(403)
      .json({ error: 'not authorized to delete this blog' });
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    { likes, title, url, author },
    { new: true }
  );
  return response.json(updatedBlog);
});

module.exports = blogRouter;
