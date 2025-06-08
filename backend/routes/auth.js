const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post("/register", async (req, res) => {
  const { username, password, faction } = req.body;

  if (!username || !password) return res.status(400).json({ message: "Missing fields" });

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: "Username already taken" });

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({ username, passwordHash, faction });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid username or password" });

  const validPass = await bcrypt.compare(password, user.passwordHash);
  if (!validPass) return res.status(400).json({ message: "Invalid username or password" });

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: "3d"
  });

  res.json({ token, user: { username: user.username, faction: user.faction } });
});

module.exports = router;