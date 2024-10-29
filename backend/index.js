const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const config = require("./config.json");
const { createAccountSchema, loginSchema } = require("./validators/authValidators");
const { authenticateToken } = require("./utilities");
const User = require("./models/user.model");

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.post("/create-account", async (req, res) => {
  try {
    const validation = createAccountSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: true, msg: "invalid credentials" });
    }

    const { username, email, password } = validation.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: true, msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const accessToken = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, { expiresIn: "3600m" });

    return res.json({ error: false, user: newUser, accessToken, msg: "Registration successful" });
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: true, msg: validation.error.errors[0].message });
    }

    const { email, password } = validation.data;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: true, msg: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, { expiresIn: "3600m" });

    return res.json({ error: false, accessToken, msg: "Login successful" });
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Internal server error" });
  }
});

const PORT =  8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
