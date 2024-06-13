const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: { type: String, required: true, unique: true },
  profilename: { type: String, required: true, unique: true },
  profileImage: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  confirmationToken: { type: String },
  confirmed: { type: Boolean, default: false },
  myImages: [String],
  aiImages: [String],
  shapes: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
profileImage