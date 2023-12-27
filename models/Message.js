const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  text: String,
  sentAt: String,
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
});

module.exports = mongoose.model('Message', MessageSchema);
