import css from "./MovieDetailsPage.module.css";

import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { requestMovieDetails } from "../../services/app";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
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

  return (
    <>
      {movieDetails !== null && (
        <div className={css.movieDetailsContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          />
          <div>
            <h2>
              {movieDetails.original_title} (
              {movieDetails.release_date.match(/^\d{4}/)[0]})
            </h2>
            <p>Userscore: {Math.round(movieDetails.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
            <h4>Genres</h4>
            {movieDetails.genres.map((genre) => (
              <span key={genre.id}>{genre.name} </span>
            ))}
          </div>
        </div>
      )}
      {movieDetails !== null && (
        <div className={css.castInfo}>
          <div className={css.additionalInfo}>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>

          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </div>
      )}

      {error && <ErrorMessage />}
    </>
  );
};

export default MovieDetailsPage;
