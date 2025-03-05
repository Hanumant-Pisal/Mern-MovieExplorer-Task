const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addFavorite, removeFavorite, getFavorites } = require("../controllers/userController");
const router = express.Router();

// Add a movie to favorites
router.post("/favorites", authMiddleware, addFavorite);

// Remove a movie from favorites
router.delete("/favorites", authMiddleware, removeFavorite);

// Get user's favorite movies
router.get("/favorites/:userId", authMiddleware, getFavorites);

module.exports = router;