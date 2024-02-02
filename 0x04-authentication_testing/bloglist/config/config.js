#!/usr/bin/env node

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const NODE_ENV = process.env.NODE_ENV;
const MONGO_URI =
  NODE_ENV === 'test' ? process.env.TEST_DB : process.env.MONGO_URI;
const PORT = process.env.PORT;

module.exports = {
  MONGO_URI,
  PORT,
  JWT_SECRET_KEY
};
