const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  imageUrl: String,
  name: String,
  lastname: String,
  lastSeenAt: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Contact', ContactSchema);
