const express = require("express");
const { searchMovies, getMovieDetails } = require("../controllers/movieController");
const router = express.Router();

router.get("/search", searchMovies);
router.get("/:id", getMovieDetails);

module.exports = router;