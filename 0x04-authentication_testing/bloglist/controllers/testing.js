#!/usr/bin/env node

/* testing router to clear the databases
 * in testing mode, so that the databases
 * is always in the same state when running tests
 * and test data is not mixed up with prod data
 */

const Blog = require("../models/blog");
const User = require("../models/user");

const testingRouter = require("express").Router();

testingRouter.post("/reset", async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  return res.status(204).send();
});

module.exports = testingRouter;
