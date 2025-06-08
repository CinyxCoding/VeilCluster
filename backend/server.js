// /backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("? Connected to MongoDB");
}).catch(err => {
  console.error("? MongoDB connection error:", err);
});

// Test route
app.get("/", (req, res) => {
  res.send("?? Welcome to Veil of Civitas backend!");
});

// Ping route to test
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Start server
app.listen(PORT, () => {
  console.log(`?? Server running on port ${PORT}`);
});