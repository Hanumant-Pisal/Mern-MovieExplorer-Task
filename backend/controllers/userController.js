const User = require("../models/User");

// Add a movie to favorites
const addFavorite = async (req, res) => {
    const { userId, movieId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the movie is already in favorites
      if (user.favorites.includes(movieId)) {
        return res.status(400).json({ message: "Movie already in favorites" });
      }
  
      // Add the movie to favorites
      user.favorites.push(movieId);
      await user.save();
  
      res.json(user.favorites);
    } catch (err) {
      console.error("Error adding favorite:", err);
      res.status(500).json({ message: "Error adding favorite", error: err.message });
    }
  };

// Remove a movie from favorites
const removeFavorite = async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the movie from favorites
    user.favorites = user.favorites.filter((id) => id.toString() !== movieId);
    await user.save();

    res.json(user.favorites);
  } catch (err) {
    console.error("Error removing favorite:", err);
    res.status(500).json({ message: "Error removing favorite", error: err.message });
  }
};

// Get user's favorite movies
const getFavorites = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ message: "Error fetching favorites", error: err.message });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites }; // Export getFavorites