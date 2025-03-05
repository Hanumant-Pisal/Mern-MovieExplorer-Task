const axios = require("axios");

const searchMovies = async (req, res) => {
  const { search } = req.query;
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${search}&apikey=7557c751`
    );
    res.json(response.data.Search || []);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies", error: err.message });
  }
};

const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=7557c751`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie details", error: err.message });
  }
};

module.exports = { searchMovies, getMovieDetails };