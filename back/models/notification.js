const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;

