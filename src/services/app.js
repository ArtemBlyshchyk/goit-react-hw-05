import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzAyZTBjYjFkOGUwM2ZjNjEwNWMyN2M2ZDAzMWM0NyIsInN1YiI6IjY2MTI5NTY5ZDc2OGZlMDE2MjQyOTkxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HiDHcilbvNOUQ0lIfhHTnZ2AnLEgy3epnvkXZMAmqFI",
  },
});

export const requestTrendingMovies = async () => {
  const { data } = await instance.get("/trending/movie/day?language=en-US");
  return data;
};

export const requestSearchMovie = async (query = "") => {
  const { data } = await instance.get(
    `/search/movie?${query}&include_adult=false&language=en-US&page=1`
  );
  return data;
};

export const requestMovieDetails = async (movieId) => {
  const { data } = await instance.get(`/movie/${movieId}?language=en-US`);
  return data;
};

export const requestMovieCredits = async (movieId) => {
  const { data } = await instance.get(
    `/movie/${movieId}/credits?language=en-US`
  );
  return data;
};

export const requestMovieReviews = async (movieId) => {
  const { data } = await instance.get(
    `/movie/${movieId}/reviews?language=en-US&page=1`
  );
  return data;
};
