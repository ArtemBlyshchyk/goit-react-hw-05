import css from "./MovieList.module.css";

import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {location.pathname === "/movies" && <h2>Search results:</h2>}
      {location.pathname === "/" && <h2>Trending today</h2>}
      {Array.isArray(movies) &&
        movies.map(({ id, original_title }) => {
          return (
            <li key={id} className={css.listItem}>
              <Link state={location} to={`/movies/${id}`}>
                {original_title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
