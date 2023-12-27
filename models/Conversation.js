const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
