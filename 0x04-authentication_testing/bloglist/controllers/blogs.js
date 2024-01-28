#!/usr/bin/env node

/* Router for the api/blogs endpoint */

const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    if (blogs.length > 0) {
      return response.json(blogs);
    }
    return response.status(204).end();
  } catch (err) {
    return next(err);
  }
});

blogRouter.get("/:id", async (request, response, next) => {
  const blogId = request.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (blog) {
      return response.json(blog);
    }
    return response.status(404).json({ error: "No blog matches that id" });
  } catch (error) {
    return next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  try {
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
    });
    await blog.save();
    return response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
