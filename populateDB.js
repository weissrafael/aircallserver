const mongoose = require('mongoose');
const Contact = require('./models/Contact');

// Replace this with your MongoDB Atlas connection string
const uri = "mongodb+srv://weissfrontend:040656aa@cluster0.dvjapfd.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const contacts = [
  { id: 1, name: 'Alice', lastSeenAt: new Date().toISOString() },
  { id: 2, name: 'Bob', lastSeenAt: new Date().toISOString() },
  { id: 3, name: 'Charlie', lastSeenAt: new Date().toISOString() },
  { id: 4, name: 'David', lastSeenAt: new Date().toISOString() },
  { id: 5, name: 'Eve', lastSeenAt: new Date().toISOString() },
  { id: 6, name: 'Frank', lastSeenAt: new Date().toISOString() },
  { id: 7, name: 'Grace', lastSeenAt: new Date().toISOString() },
  { id: 8, name: 'Hannah', lastSeenAt: new Date().toISOString() },
  { id: 9, name: 'Ivan', lastSeenAt: new Date().toISOString() },
  { id: 10, name: 'Judy', lastSeenAt: new Date().toISOString() }
];

Contact.insertMany(contacts)
  .then(() => {
    console.log('Contacts added successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error adding contacts:', err);
    mongoose.connection.close();
  });
