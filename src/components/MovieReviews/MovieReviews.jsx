import css from "./MovieReviews.module.css";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { useMovieSearch } from "../../hooks/useMovieSearch";

const MovieReviews = () => {
  const { isLoading, error, movieReviews } = useMovieSearch({
    isSearchPage: true,
  });

  return (
    <div>
      {isLoading && <Loader />}
      {movieReviews !== null && movieReviews.length > 0 ? (
        movieReviews.map((review) => (
          <ul className={css.reviewsContainer} key={review.id}>
            <li>Author: {review.author}</li>
            <li>{review.content}</li>
          </ul>
        ))
      ) : (
        <p>We don&apos;t have any reviews for this movie.</p>
      )}
      {error && <ErrorMessage />}
    </div>
  );
};

export default MovieReviews;
