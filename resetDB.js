const mongoose = require('mongoose');
const Contact = require('./models/Contact');
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');

// Replace this with your MongoDB Atlas connection string
const uri = "mongodb+srv://weissfrontend:040656aa@cluster0.dvjapfd.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const resetDatabase = async () => {
  try {
    // Deleting all documents from each collection
    await Contact.deleteMany({});
    await Message.deleteMany({});
    await Conversation.deleteMany({});

    console.log('Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    mongoose.connection.close();
  }
};

resetDatabase();
