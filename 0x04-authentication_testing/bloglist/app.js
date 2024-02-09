#!/usr/bin/env node

/* main application for the backend */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const authRouter = require('./controllers/auth');
const { errorHandler, undefinedPaths } = require('./middleware/errors');
const { MONGO_URI } = require('./config/config');
const { error } = require('./utils/logger');
const tokenExtractor = require('./middleware/auth');

mongoose.connect(MONGO_URI).catch((err) => error(`Error ${err}`));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use(undefinedPaths);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}
module.exports = app;
