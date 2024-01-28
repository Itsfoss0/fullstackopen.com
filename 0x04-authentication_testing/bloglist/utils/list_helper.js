#!/usr/bin/env node

/* dummy helper utility functions for the blog */

const dummy = (blogs) => {
  return 1;
};

// todo: handle all edge cases, when blog is not a list
const totalLikes = (blogs) => {
  const results = blogs.reduce((acc, curr) => acc + curr.likes, 0);
  return results;
};

// todo: handle all edge cases, when blog may not be a list
// assumes that the blogs list will have atlest one element
const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((maxLikesBLog, currentBlog) => {
    return currentBlog.likes > maxLikesBLog.likes ? currentBlog : maxLikesBLog;
  }, blogs[0]);
  return favBlog;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
