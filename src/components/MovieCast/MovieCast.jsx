import css from "./MovieCast.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { isLoading, error, castDetails } = useMovieSearch({
    isSearchPage: true,
  });

  return (
    <div>
      {isLoading && <Loader />}
      {castDetails !== null && castDetails.length > 0 ? (
        castDetails.map((castDetail) => (
          <div className={css.castContainerInfo} key={castDetail.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${castDetail.profile_path}`}
              alt={castDetail.name}
            />
            <ul>
              <li>{castDetail.name}</li>
              <li>{castDetail.character}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>No cast details available!</p>
      )}
      {error && <ErrorMessage />}
    </div>
  );
};

export default MovieCast;
