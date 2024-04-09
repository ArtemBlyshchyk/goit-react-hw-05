import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  requestMovieCredits,
  requestMovieDetails,
  requestMovieReviews,
  requestSearchMovie,
  requestTrendingMovies,
} from "../services/app";

export const useMovieSearch = ({ isSearchPage = false }) => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  //MovieDetailsPage
  const [movieDetails, setMovieDetails] = useState(null);
  //MovieDetailsPage
  //Cast info
  const { movieId } = useParams();
  const [castDetails, setCastDetails] = useState(null);
  //Cast info
  const query = searchParams.get("query");
  //Movie review
  const [movieReviews, setMovieReviews] = useState(null);
  //movie review

  useEffect(() => {
    if (isSearchPage) return;
    async function getTrendingMovies() {
      setIsLoading(true);
      try {
        const data = await requestTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getTrendingMovies();
  }, [isSearchPage]);

  useEffect(() => {
    if (!query) return;
    async function fetchMovieByQuery() {
      setIsLoading(true);
      try {
        const data = await requestSearchMovie(`query=${query}`);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieByQuery();
  }, [query]);

  const onSearchQuery = (searchMovie) => {
    setSearchParams({ query: searchMovie });
  };

  //MovieDetailsPage
  useEffect(() => {
    if (!movieId) return;
    async function fetchMovieDetails() {
      try {
        const data = await requestMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError(true);
      }
    }
    fetchMovieDetails();
  }, [movieId]);
  //MovieDetailsPage

  //Cast info
  useEffect(() => {
    if (!movieId) return;
    async function fetchMovieCredits() {
      setIsLoading(true);
      try {
        const data = await requestMovieCredits(movieId);
        setCastDetails(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieCredits();
  }, [movieId]);
  // Cast info

  //Movie review
  useEffect(() => {
    if (!movieId) return;
    async function fetchMovieReviews() {
      setIsLoading(true);
      try {
        const data = await requestMovieReviews(movieId);
        setMovieReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieReviews();
  }, [movieId]);

  return {
    movies,
    isLoading,
    error,
    onSearchQuery,
    castDetails,
    movieReviews,
    movieDetails,
  };
};
