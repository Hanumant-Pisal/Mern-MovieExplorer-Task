const axios = require("axios");

const searchMovies = async (search) => {
  const response = await axios.get(
    `http://www.omdbapi.com/?s=${search}&apikey=7557c751`
  );
  return response.data.Search || [];
};

const getMovieDetails = async (id) => {
  const response = await axios.get(
    `http://www.omdbapi.com/?i=${id}&apikey=7557c751`
  );
  return response.data;
};

module.exports = { searchMovies, getMovieDetails };