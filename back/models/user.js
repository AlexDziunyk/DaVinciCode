const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: { type: String, required: true, unique: true },
  profilename: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  confirmationToken: { type: String },
  confirmed: { type: Boolean, default: false },
  myImages: [String],
  aiImages: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
