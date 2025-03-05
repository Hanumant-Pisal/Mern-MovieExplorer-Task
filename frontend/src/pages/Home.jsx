import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import MovieSearch from "../components/MovieSearch";

const Home = () => {
  const movies = useSelector((state) => state.movies.movies);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://i.pinimg.com/736x/d3/6f/7c/d36f7c0e6969ea7c6701975259ccdef4.jpg')" }}
    >
      <div className="min-h-screen p-4 sm:p-6 md:p-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white animate-bounce mb-4 drop-shadow-lg leading-snug">
          Explore Endless Movies Search, Download & Enjoy!
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-500 mb-8 drop-shadow-md leading-relaxed">
          Experience the ultimate collection of movies at your fingertips.
        </h2>
        <MovieSearch />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
          ) : (
            <p className="text-white text-lg col-span-full"></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
