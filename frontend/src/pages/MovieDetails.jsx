import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=7557c751`
      );
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="text-center text-xl p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-zinc-900  shadow-lg rounded p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-white mb-6">{movie.Title}</h1>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img src={movie.Poster} alt={movie.Title} className="w-64 rounded shadow-md border border-white" />
          <div className="space-y-4 text-lg ">
            <p className="text-white "><strong>Plot:</strong> {movie.Plot}</p>
            <p className="text-white"><strong>Year:</strong> {movie.Year}</p>
            <p className="text-white"><strong>Genre:</strong> {movie.Genre}</p>
            <p className="text-white"><strong>Director:</strong> {movie.Director}</p>
            <p className="text-white"><strong>Cast:</strong> {movie.Actors}</p>
            <p className="text-white"><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
