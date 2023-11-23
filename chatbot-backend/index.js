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
    if (message.toLowerCase() === "what's your favorite song?") {
      return res.send(JSON.stringify({ success: true, message: "Redirecting to YouTube", bot: "" }));
    }
    if (message.toLowerCase() === "open netflix") {
      return res.send(JSON.stringify({ success: true, message: "Redirecting to Netflix", bot: "" }));
    }
    if (message.toLowerCase() === "open netflix") {
      return res.send(JSON.stringify({ success: true, message: "Redirecting to Wikipedia", bot: "" }));
    }
    if (message.toLowerCase() === "open netflix") {
      return res.send(JSON.stringify({ success: true, message: "Redirecting to Youtube", bot: "" }));
    }
    if (message.toLowerCase() === "open random site") {
      const randomSites = [
        'https://chat.openai.com/',
          'https://updatefaker.com/windows11/index.html',
          'https://www.instagram.com/aakashsonics/',
          'https://web.whatsapp.com/',
          'https://trello.com/b/V7SBUlFh/school-everyday',
          'https://www.icloud.com/notes/021Cz80HGF0KKVGBusbJT4Qpg'
      ];
      const randomIndex = Math.floor(Math.random() * randomSites.length);
      const randomSite = randomSites[randomIndex];
      return res.send(JSON.stringify({ success: true, message: `Opening random site: ${randomSite}`, bot: "" }));
    }

    const user = await User.findOne({ username: sender }).exec();

    if (user) {
      let chats = user.chats;
      const botResponse = generateBotResponse(message);
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


const generateBotResponse = (message) => {
  const responseOptions = ['Yes', 'No', 'Probably', 'I don\'t think so', 'Definitely', 'Maybe', 'Ask again later... I\'m busy contemplating'];

  if (message.toLowerCase().includes("how are you?")) {
    return "For a bot, pretty good...";
  }

  if (message.toLowerCase().includes("are you gay?")) {
    return "Tschorry? Nö... ganz freche aff.";
  }

  if (message.toLowerCase().includes("abi")) {
    return "bodelos..";
  }

  if (message.toLowerCase().includes("weather")) {
    return "I'd tell you if I knew...";
  }

  if (message.toLowerCase().includes("favorite song?")) {
    return "Check it out!";
  }

  if (message.toLowerCase().includes("sites?")) {
    return "Yes! some, but not all. Try it :)";
  }

  if (message.toLowerCase().includes("ate")) {
    return "and left no crumbs...";
  }
  

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
      const newUser = await User.create({username:username})
      return res
        .status(201)
        .json({ success: true, message: "User registered successfully!" });
    }
  } catch (error) {
    console.log(error)
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
