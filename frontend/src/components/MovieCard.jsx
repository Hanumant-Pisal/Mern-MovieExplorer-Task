import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, onAddFavorite, onRemoveFavorite, isFavorite }) => {
  return (
    <div className="bg-zinc-950 text-white p-4 rounded shadow">
      <Link to={`/movie/${movie.imdbID}`}>
      <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover border border-white" />
      <h2 className="text-xl font-bold mt-2">
        {movie.Title}
      </h2>
      <p>{movie.Year}</p>
      </Link>
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