const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, min: 4, require: true, unique: true },
  password: { type: String, min: 4, require: true }
});


module.exports = mongoose.model('User', User);