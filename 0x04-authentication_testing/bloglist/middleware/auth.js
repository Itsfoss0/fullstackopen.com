#!/usr/bin/env node
/* extract token from reqeust headers and set them as the request.token */

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization').replace('Bearer ', '');
  request.token = auth;
  console.log(request.token);
  return next();
};

module.exports = tokenExtractor;
