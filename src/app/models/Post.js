const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  title: {type: String,},
  content: {type: String},
  type: {type: String},
  description: {type: String},
  thumbnail: {type: String},
  created_at: {type: Date, default: Date.now()},
  updated_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Post', Post);