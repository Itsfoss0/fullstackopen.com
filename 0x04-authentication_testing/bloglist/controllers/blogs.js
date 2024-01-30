#!/usr/bin/env node

/* Router for the api/blogs endpoint */

const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  if (blogs.length > 0) {
    return response.json(blogs);
  }
  return response.status(204).end();
});

blogRouter.get("/:id", async (request, response) => {
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  if (blog) {
    return response.json(blog);
  }
  return response.status(404).json({ error: "No blog matches that id" });
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
  });
  await blog.save();
  return response.status(201).json(blog);
});

module.exports = blogRouter;
