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

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} className="w-64 my-4" />
      <p>{movie.Plot}</p>
      <p>Year: {movie.Year}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Director: {movie.Director}</p>
      <p>Cast: {movie.Actors}</p>
      <p>IMDb Rating: {movie.imdbRating}</p>
    </div>
  );
};

export default MovieDetails;