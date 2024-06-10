const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: { type: String, required: true, unique: true },
  profilename: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  confirmationToken: { type: String },
  confirmed: { type: Boolean, default: false },
  notifications: [{
    title: String,
    text: String
  }],
  role: [{ type: String, enum: ['user'] }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
