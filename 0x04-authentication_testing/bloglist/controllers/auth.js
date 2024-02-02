#!/usr/bin/env node

/* user auth for the login and token fresh functionalities */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET_KEY } = require('../config/config');
const authRouter = require('express').Router();

authRouter.post('/login', async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  if (!user) return response.status(404).json({ error: 'user not found' });
  const correctPassword = await bcrypt.compare(password, user.passwordHash);
  if (correctPassword) {
    const userToSerialize = {
      username: user.username,
      name: user.name,
      userId: user._id
    };
    const token = jwt.sign(userToSerialize, JWT_SECRET_KEY, {
      expiresIn: 60 * 60
    });
    return response.status(200).send({
      accessToken: token,
      username: user.username,
      name: user.name
    });
  }
  // password from request did not match hashed one
  return response
    .status(401)
    .json({ error: 'username or password is incorrect' });
});

module.exports = authRouter;
