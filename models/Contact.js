const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  lastSeenAt: String
});

module.exports = mongoose.model('Contact', ContactSchema);
