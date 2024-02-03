#!/usr/bin/env node

/* extract token from the authorization header
 * and determine the user from the token,
 * assign the user to the request.user prop
 * while at the same time assign the token
 * to request.token for easier auth handling
 * on routes that require authorization
 * the tokenExtractor middlware has to be applied
 * before the userExtractor middleware
 * Example usage:
 * router.use(tokenExtractor)
 * router.use(userExtractor)
 */

const { JWT_SECRET_KEY } = require('./../config/config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (request, response, next) => {
  if (request.method === 'GET') return next();
  const auth = request.get('authorization').replace('Bearer ', '');
  request.token = auth;
  return next();
};

const userExtractor = async (request, response, next) => {
  // a get request doesn't have a token prop
  // it'd be useless to try and get the user for it
  if (request.method === 'GET') return next();
  try {
    const decodedToken = jwt.verify(request.token, JWT_SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (user) {
      request.user = user;
      return next();
    }
    request.user = null;
    return next();
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  tokenExtractor,
  userExtractor
};
