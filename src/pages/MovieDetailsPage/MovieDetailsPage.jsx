import css from "./MovieDetailsPage.module.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useRef } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { useMovieSearch } from "../../hooks/useMovieSearch";
const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { isLoading, error, movieDetails } = useMovieSearch({
    isSearchPage: true,
  });
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  return (
    <>
      <Link to={backLinkRef.current}>⬅ Go back</Link>
      {isLoading && <Loader />}
      {movieDetails !== null && (
        <div className={css.movieDetailsContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          />
          <div>
            <h2>
              {movieDetails.original_title} (
              {/* {movieDetails.release_date.match(/^\d{4}/)[0]}) */}
              {movieDetails.release_date.match(/^\d{4}/)
                ? movieDetails.release_date.match(/^\d{4}/)[0]
                : "Unknown"}
              )
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

          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Routes>
          </Suspense>
        </div>
      )}

      {error && <ErrorMessage />}
    </>
  );
};

export default MovieDetailsPage;
