import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, onAddFavorite, onRemoveFavorite, isFavorite }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
      <h2 className="text-xl font-bold mt-2">
        <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
      </h2>
      <p>{movie.Year}</p>
      {onAddFavorite && (
        <button
          onClick={() => onAddFavorite(movie.imdbID)}
          className="p-2 bg-blue-500 text-white rounded mt-2"
        >
          Add to Favorites
        </button>
      )}
      {onRemoveFavorite && (
        <button
          onClick={() => onRemoveFavorite(movie.imdbID)}
          className="p-2 bg-red-500 text-white rounded mt-2"
        >
          Remove Favorite
        </button>
      )}
    </div>
  );
};

export default MovieCard;