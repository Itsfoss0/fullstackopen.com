const morgan = require('morgan');

const loggerMidleware = morgan(function (tokens, req, res) {
  const requestBody = JSON.stringify(req.body) || '';
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    requestBody
  ].join(' ');
});

module.exports = {
  loggerMidleware
};
