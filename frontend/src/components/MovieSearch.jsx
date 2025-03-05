import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "../features/movieSlice";
import axios from "axios";

const MovieSearch = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/search?search=${search}`
      );
      dispatch(setMovies(response.data)); // Dispatch search results to Redux store
    } catch (err) {
      console.error("Error searching movies:", err);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border border-red-600  text-black bg-white rounded w-74"
        placeholder="Search for a movie..."
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-red-600 hover:bg-zinc-900 cursor-pointer w-34 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default MovieSearch;