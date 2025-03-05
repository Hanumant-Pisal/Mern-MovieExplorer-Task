import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "../features/movieSlice";
import axios from "axios";

const MovieSearch = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [noResults, setNoResults] = useState(false); 
  const dispatch = useDispatch();

  const handleSearch = async () => {
    setIsLoading(true); 
    setNoResults(false); 
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/search?search=${search}`
      );
      if (response.data.length === 0) {
        setNoResults(true); 
      } else {
        dispatch(setMovies(response.data)); 
      }
    } catch (err) {
      console.error("Error searching movies:", err);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-6">
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-red-600 text-black bg-white rounded w-74"
          placeholder="Search for a movie..."
        />
        <button
          onClick={handleSearch}
          disabled={isLoading} 
          className="p-2 bg-red-600 hover:bg-zinc-900 cursor-pointer w-34 text-white rounded"
        >
          {isLoading ? "Searching..." : "Search"} 
        </button>
      </div>
      {isLoading && <p className="mt-4 text-white text-2xl">Loading...</p>} 
      {noResults && <p className="mt-4 text-white text-2xl">No movies found. Try another search.</p>} 
    </div>
  );
};

export default MovieSearch;