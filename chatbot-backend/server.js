const express = require("express");
const app = express();
const port = 4444;
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Verbindung
mongoose.connect('mongodb://localhost:27017/chatbotdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: Date,
});

const Message = mongoose.model('Message', messageSchema);


app.post("/login", (req, res) => {
  const { username } = req.body;
  if (username) {
    return res.json({ message: "Login successful", username });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

// Save message endpoint
app.post("/saveMessage", async (req, res) => {
  const { username, message } = req.body;
  // Save the message to the database
  const newMessage = new Message({ username, message, timestamp: new Date() });
  await newMessage.save();
  return res.json({ message: "Message saved" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
