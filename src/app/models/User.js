const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, min: 4, require: true },
  password: { type: String, min: 4, require: true }
});

module.exports = mongoose.model('User', User);