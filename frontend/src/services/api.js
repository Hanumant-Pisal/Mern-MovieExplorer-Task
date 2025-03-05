import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a request interceptor to attach the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const searchMovies = async (search) => {
  const response = await api.get(`/movies/search?search=${search}`);
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};

export const getFavorites = async (userId) => {
  const response = await api.get(`/user/favorites/${userId}`);
  return response.data;
};

export const addFavorite = async (userId, movieId) => {
  const response = await api.post("/user/favorites", { userId, movieId });
  return response.data;
};

export const removeFavorite = async (userId, movieId) => {
  const response = await api.delete("/user/favorites", { data: { userId, movieId } });
  return response.data;
};

export default api;