const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

mongoose.connect("mongodb://localhost:27017/chat-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  username: String,
  chats: [
    {
      sender: String,
      message: String,
    },
  ],
});

const User = db.model("users", userSchema);

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  const { username } = req.body;
  req.username = username;
  next();
});

const db_user = new User();

app.post("/saveChat", async (req, res) => {
  const { sender, message } = req.body;

  try {
    if (message.toLowerCase() === 'about') {
      return res.send(JSON.stringify({ success: true, message: "Redirecting to about page", bot: "" }));
    }
    if (message.toLowerCase() === 'log out') {
      return res.send(JSON.stringify({ success: true, message: "Redirecting to log in page", bot: "" }));
    }

    const user = await User.findOne({ username: sender }).exec();

    if (user) {
      let chats = user.chats;
      const botResponse = generateBotResponse();
      const updateUser = await User.findOneAndUpdate(
        { username: sender },
        {
          chats: [
            ...chats,
            { sender: sender, message: message },
            { sender: "bot", message: botResponse },
          ],
        },
        { new: true }
      ).exec();

      return res.send(JSON.stringify({ success: true, message: "Chat saved successfully", bot: botResponse }))
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found", bot: "" });
    }
  } catch (error) {
    console.error("Error during chat saving:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

const generateBotResponse = () => {
  const responseOptions = ['Yes', 'No', 'Probably', 'I don\'t think so', 'Definitely', 'Maybe', 'Ask again later... I\'m busy contemplating'];
  const randomIndex = Math.floor(Math.random() * responseOptions.length);
  return responseOptions[randomIndex];
};

const users = [];

app.post("/register", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username }).exec();
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken! Try another one." });
    } else {
      db_user.username = username;
      await db_user.save();
      return res
        .status(201)
        .json({ success: true, message: "User registered successfully!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong... Try again later" });
  }
});

app.post("/login", async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username: username }).exec();
  if (user) {
    return res
      .status(200)
      .json({ success: true, message: "Login successful!" });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Username not found!" });
  }
});

app.post("/getchats", async (req,res) => {
  const {username} = req.body;

  const user = await User.findOne({ username: username }).exec();
  if (user) {
    let chats = user.chats
    return res
      .status(200)
      .json({ success: true, message: "successfull", chats:chats });
    
  } else {
    return res
      .status(401)
      .json({ success: false, message: "unsuccessfull" });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
