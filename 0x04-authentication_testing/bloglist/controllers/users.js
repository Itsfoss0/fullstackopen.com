#!/usr/bin/env node

/* routes for the /api/users path */

const bcrypt = require('bcrypt');
const User = require('../models/user');
const userRouter = require('express').Router();

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1
  });
  if (users.length === 0) return response.status(204).end();
  return response.json(users);
});

userRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const user = await User.findById(id).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1
  });
  if (!user) return response.status(404).json({ error: 'user not found' });
  return response.json(user);
});

userRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const userToDelete = User.findOneAndDelete({ _id: id });
  if (!userToDelete) {
    return response.status(404).json({ error: 'user not found' });
  }
  return response.json(userToDelete);
});

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    name,
    passwordHash
  });
  await newUser.save();
  return response.status(201).json(newUser);
});

module.exports = userRouter;
