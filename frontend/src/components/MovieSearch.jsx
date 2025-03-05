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
    <div className="flex gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded"
        placeholder="Search for a movie..."
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default MovieSearch;