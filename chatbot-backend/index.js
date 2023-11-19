const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const users = [];

app.post("/register", (req, res) => {
  const { username } = req.body;

  if (users.includes(username)) {
    return res
      .status(400)
      .json({ success: false, message: "Username already taken" });
  } else {
    users.push(username);
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  }
});

app.post("/login", (req, res) => {
  const { username } = req.body;

  if (users.includes(username)) {
    return res
      .status(200)
      .json({ success: true, message: "Login successful!" });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//ohne CORS gehts nicht!

