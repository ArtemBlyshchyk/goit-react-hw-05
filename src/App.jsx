import { Suspense, lazy } from "react";
import css from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage.jsx"));
const Navigation = lazy(() => import("./components/Navigation/Navigation.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage.jsx")
);

function App() {
  return (
    <div>
      <header className={css.headerStyles}>
        <Navigation />
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route
              path="/movies/:movieId/*"
              element={<MovieDetailsPage />}
            ></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
