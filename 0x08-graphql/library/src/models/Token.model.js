const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
