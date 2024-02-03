#!/usr/bin/env node

/* utility functions for tests
 * including setup and teardown for
 * the test suites
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MONGO_URI } = require('../config/config');
const Blog = require('../models/blog');
const User = require('../models/user');

mongoose.connect(MONGO_URI);

const createUsers = async () => {
  const users = [
    {
      username: '@itsfoss0',
      name: 'itsfoss0',
      passwordHash: await bcrypt.hash('itsfoss', 10)
    },
    {
      username: '@johndoe',
      name: 'johndoe',
      passwordHash: await bcrypt.hash('jdoe', 10)
    }
  ];

  const userObjects = users.map((user) => new User(user));
  const createUsersPromise = userObjects.map((user) => user.save());
  await Promise.all(createUsersPromise);
};

const createBlogs = async () => {
  const users = await User.find({});
  const user = users[0];
  const blogs = [
    {
      title: 'Gitting good at git',
      author: 'Itsfoss0',
      url: 'https://itsfoss0.hasnode.dev',
      user: user._id
    },
    {
      title: 'Docker compose for humans',
      author: 'Brett Fisher',
      url: 'https://brett.hasnode.dev',
      user: user._id
    },
    {
      title: 'Learn fullstack development',
      author: 'University of Helsinki',
      url: 'https://fullstackopen.com',
      user: user._id
    },
    {
      title: 'Understanding Linux Init stystems',
      author: 'Itsfoss0',
      url: 'https://itsfoss0.hasnode.dev',
      user: user._id
    }
  ];
  const blogObjects = blogs.map((blog) => new Blog(blog));
  const saveBlogsPromise = blogObjects.map((blog) => blog.save());
  await Promise.all(saveBlogsPromise);
};

const initDB = async () => {
  await createUsers();
  await createBlogs();
};

const clearDB = async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
};

module.exports = {
  initDB,
  clearDB
};
