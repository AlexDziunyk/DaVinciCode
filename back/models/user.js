const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: { type: String, required: true, unique: true },
  profilename: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  confirmationToken: { type: String },
  confirmed: { type: Boolean, default: false },
  notifications: [{
    title: String,
    text: String
  }],
  role: { type: String, enum: ['user'], default: 'user' },
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
  uploadedImages: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
  aiGeneratedImages: [{ type: Schema.Types.ObjectId, ref: 'Image' }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
