import css from "./MoviesPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import MovieList from "../../components/MovieList/MovieList";
import MovieSearchForm from "../../components/MovieSearchForm/MovieSearchForm";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const { movies, error, isLoading, onSearchQuery } = useMovieSearch({
    isSearchPage: true,
  });

  return (
    <div className={css.moviesContainer}>
      <MovieSearchForm onSearchQuery={onSearchQuery} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
