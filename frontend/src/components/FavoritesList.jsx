import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const FavoritesList = () => {
  const favorites = useSelector((state) => state.movies.favorites);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {favorites.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default FavoritesList;