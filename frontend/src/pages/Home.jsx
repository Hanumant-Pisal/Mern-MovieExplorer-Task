import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import MovieSearch from "../components/MovieSearch";

const Home = () => {
  const movies = useSelector((state) => state.movies.movies);

  return (
    <div className="p-4">
      <MovieSearch />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;