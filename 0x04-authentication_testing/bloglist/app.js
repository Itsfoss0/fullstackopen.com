#!/usr/bin/env node

/* main application for the backend */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');
const blogRouter = require('./controllers/blogs');
const { undefinedRouteHandler } = require('./middleware/errors');
const { MONGO_URI } = require('./config/config');
const { info, error } = require('./utils/logger');

mongoose
  .connect(MONGO_URI)
  .then(() => info('Connected to database'))
  .catch((err) => error(`Error ${err}`));

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/blogs', blogRouter);
app.use(undefinedRouteHandler);

module.exports = app;
