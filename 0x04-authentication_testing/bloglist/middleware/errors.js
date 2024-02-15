#!/usr/bin/env node

/* error handler middlewares */

const errorHandler = (error, request, response, next) => {
  let status = 404;
  let message = 'URL not found';
  switch (error.name) {
    case 'CastError':
      status = 400;
      message = 'Malformed ID, check the ID and try again';
      break;
    case 'ValidationError':
      status = 400;
      message = 'Bad request';
      break;
    case 'MongoServerError':
      status = 409;
      message = 'User with that name already exists';
      break;
    case 'TokenExpiredError':
      status = 401;
      message = 'Token expired';
      break;
    case 'TypeError':
      status = 400;
      message = 'Missing authorization in the request';
      break;
  }
  return response.status(status).json({ error: message });
};

const undefinedPaths = (reqeust, response) =>
  response.status(404).json({ error: 'url not found' });
module.exports = {
  errorHandler,
  undefinedPaths
};
