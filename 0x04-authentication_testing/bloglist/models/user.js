#!/usr/bin/env node

/* user model for authentication and authorization */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
    message: '{VALUE} is already taken, try a different one'
  },
  name: {
    type: String,
    required: true,
    minLenght: 3
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (doc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString();
    delete returnedDoc._id;
    delete returnedDoc.__v;
    delete returnedDoc.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
