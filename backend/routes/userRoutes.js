const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addFavorite, removeFavorite, getFavorites } = require("../controllers/userController");
const router = express.Router();


router.post("/favorites", authMiddleware, addFavorite);


router.delete("/favorites", authMiddleware, removeFavorite);


router.get("/favorites/:userId", authMiddleware, getFavorites);

module.exports = router;