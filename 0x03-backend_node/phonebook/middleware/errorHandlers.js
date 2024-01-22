const undefinedRouteHandler = (request, response) => {
  response.status(404).json({ error: 'URL not found' });
};

module.exports = {
  undefinedRouteHandler
};
