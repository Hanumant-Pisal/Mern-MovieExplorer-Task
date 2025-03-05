import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [], // For search results
  favorites: [], // For user's favorite movies
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
});

export const { setMovies, setFavorites, addFavorite, removeFavorite } = movieSlice.actions;
export default movieSlice.reducer;