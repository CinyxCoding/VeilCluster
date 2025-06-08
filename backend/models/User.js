const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  faction: { type: String, enum: ["Order", "Dissent", "Neutral"], default: "Neutral" },
  createdAt: { type: Date, default: Date.now },
  morality: { type: Number, default: 0 },
  reputation: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", UserSchema);
