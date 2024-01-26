const undefinedRouteHandler = (request, response) => {
  response.status(404).json({ error: 'URL not found' });
};

const malformedIdError = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformed id' });
  }
  next(error);
};

module.exports = {
  undefinedRouteHandler,
  malformedIdError
};
