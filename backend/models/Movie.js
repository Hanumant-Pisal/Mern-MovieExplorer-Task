const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  imdbID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  year: { type: String, required: true },
  poster: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  cast: { type: String, required: true },
  imdbRating: { type: String, required: true },
});

module.exports = mongoose.model("Movie", movieSchema);