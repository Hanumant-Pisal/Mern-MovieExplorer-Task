const mongoose = require("mongoose");
const Movie = require("./Movie");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: []

});

module.exports = mongoose.model("User", userSchema);