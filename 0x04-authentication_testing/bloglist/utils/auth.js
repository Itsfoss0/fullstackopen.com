#!/usr/bin/env node

/* helper functions for user auth */

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer')) {
    console.log(authorization);
    return authorization.replace('Bearer ', '');
  }
  return null;
};

module.exports = getTokenFrom;
