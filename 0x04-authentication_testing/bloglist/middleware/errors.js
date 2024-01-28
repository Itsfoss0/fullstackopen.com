#!/usr/bin/env node

/* error handler middlewares */

const undefinedRouteHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response
      .status(400)
      .json({ error: 'Malformed ID, check the ID and try again' });
  }
  return response.status(404).json({ error: 'URL Not found' });
};

module.exports = {
  undefinedRouteHandler
};
