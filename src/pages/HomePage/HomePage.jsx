import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const { movies, isLoading, error } = useMovieSearch({ isSearchPage: false });
  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
