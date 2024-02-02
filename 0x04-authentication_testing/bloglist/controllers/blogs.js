#!/usr/bin/env node

/* Router for the api/blogs endpoint */

const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

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
  const blogId = request.params.id;
  await Blog.deleteOne({ _id: blogId });
  return response.status(204).end();
});

blogRouter.post('/', async (request, response) => {
  const users = await User.find({});
  const user = users[0];
  const body = request.body;
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    user: user._id
  });
  await blog.save();
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
