const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Contact = require('./models/Contact');
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const port = 3001;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://weissfrontend:040656aa@cluster0.dvjapfd.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/user', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/user/:userId/conversation', async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversation.find({ members: userId }).populate('members').populate('lastMessage');
    res.json(conversations);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/user/:userId/conversation/:conversationId', async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const conversation = await Conversation.findById(conversationId).populate('members').populate('lastMessage');
    res.json(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/user/:userId/conversation/:conversationId/message', async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const messages = await Message.find({ conversationId: conversationId }).populate('');
    res.json(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/user/:userId/conversation', async (req, res) => {
  try {
    const lastMessage = await Message.create({
      userId: req.body.userId,
      text: '',
      sentAt: new Date().toISOString(),
    });
    console.log('name: ', req.body.name);
    const newConversation = new Conversation({
      name: req.body.name,
      members: req.body.userIds,
      lastMessage: lastMessage._id,
    });
    const savedConversation = await newConversation.save();
    res.json(savedConversation);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/user/:userId/conversation/:conversationId/message', async (req, res) => {
  try {
    const newMessage = new Message({
      userId: req.params.userId,
      text: req.body.text,
      sentAt: new Date().toISOString(),
      conversationId: req.params.conversationId,
    });

    const savedMessage = await newMessage.save();

    // Optionally, update the lastMessage in the Conversation model
    await Conversation.findByIdAndUpdate(req.params.conversationId, { lastMessage: savedMessage._id });

    res.json(savedMessage);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new Contact({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      lastname: req.body.lastname,
      lastSeenAt: new Date().toISOString(),
      email: req.body.email,
      password: hashedPassword
    });

    const newUser = await user.save();
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '4h' });
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).send(error);
  }
});

const jwtSecret = '9vA48Dwm*9-72@Vmwx5S+H!z#RpqN3t6';

app.post('/login', async (req, res) => {
  try {
    const user = await Contact.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send('User not found.');
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '4h' });
      res.json({ token, user });
    } else {
      res.status(401).send('Authentication failed');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
