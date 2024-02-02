#!/usr/bin/env node

/* utility functions for tests
 * including setup and teardown for
 * the test suites
 */

const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/config');
const Blog = require('../models/blog');

mongoose.connect(MONGO_URI);

const blogs = [
  {
    title: 'Gitting good at git',
    author: 'Itsfoss0',
    url: 'https://itsfoss0.hasnode.dev'
  },
  {
    title: 'Docker compose for humans',
    author: 'Brett Fisher',
    url: 'https://brett.hasnode.dev'
  },
  {
    title: 'Learn fullstack development',
    author: 'University of Helsinki',
    url: 'https://fullstackopen.com'
  },
  {
    title: 'Understanding Linux Init stystems',
    author: 'Itsfoss0',
    url: 'https://itsfoss0.hasnode.dev'
  }
];

const initDB = async () => {
  const blogObjects = blogs.map((blog) => Blog(blog));
  const saveBlogsPromises = blogObjects.map((blog) => blog.save());
  await Promise.all(saveBlogsPromises);
};

const clearDB = async () => {
  await Blog.deleteMany({});
  await mongoose.connection.close();
};

module.exports = {
  initDB,
  clearDB,
  blogs
};
