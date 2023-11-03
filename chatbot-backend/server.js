const express = require("express");
const app = express();
const port = 4444;

app.use(express.json());
app.use(express.urlencoded());

// Demo User
const users = [{ username: "user1" }, { username: "user2" }];

app.post("/login", (req, res) => {
  const { username } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ message: "Login successful", user });
});


// ... CHATGPT corrected MongoDB injection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chatbotdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for your messages collection
const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: Date,
});

//const Message = mongoose.model('Message', messageSchema);

//app.get("/", function (_, resp){
//await Message.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec();
//})

// ... Continue with the rest of your server code

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

