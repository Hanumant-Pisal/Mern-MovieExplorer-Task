import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies, addFavorite, removeFavorite } from "../features/movieSlice";
import { getFavorites, addFavorite as apiAddFavorite, removeFavorite as apiRemoveFavorite } from "../services/api";
import MovieCard from "../components/MovieCard";
import MovieSearch from "../components/MovieSearch";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { movies, favorites } = useSelector((state) => state.movies); 
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUserId(decoded.userId);
    }
  }, []);

  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites(userId);
        dispatch(setMovies(favorites)); 
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    if (userId) fetchFavorites();
  }, [userId, dispatch]);

 
  const handleAddFavorite = async (movieId) => {
    try {
      const response = await apiAddFavorite(userId, movieId);
      dispatch(addFavorite(movieId)); 
     alert("Movie Added to Favorite:", response.data);
      setError(""); 
    } catch (err) {
      console.error("Error adding favorite:", err);
      setError(err.response?.data?.message || "Error adding favorite. Please try again.");
    }
  };


  const handleRemoveFavorite = async (movieId) => {
    try {
      await apiRemoveFavorite(userId, movieId);
      dispatch(removeFavorite(movieId));
      alert("Movie remove from Favorite:");
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <div className="p-4 ">
     
      {error && <p className="text-red-500">{error}</p>}
      <MovieSearch />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      
        {movies.map((movie) => (
          <div key={movie.imdbID} className="relative">
            <MovieCard movie={movie} />
            <button
              onClick={() => handleAddFavorite(movie.imdbID)}
              className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded"
            >
              Add Favorite
            </button>
          </div>
        ))}
       
        {favorites.map((movie) => (
          <div key={movie.imdbID} className="relative">
            <MovieCard movie={movie} />
            <button
              onClick={() => handleRemoveFavorite(movie.imdbID)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
            >
              Remove Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;