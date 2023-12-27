const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userId: String,
  text: String,
  sentAt: String
});

module.exports = mongoose.model('Message', MessageSchema);
