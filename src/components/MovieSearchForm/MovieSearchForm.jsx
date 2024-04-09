import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import css from "./MovieSearchForm.module.css";

const MovieSchema = Yup.object().shape({
  searchMovie: Yup.string().required("Movie's name is required!"),
});

const formInitialValue = {
  searchMovie: "",
};

const MovieSearchForm = ({ onSearchQuery }) => {
  const handleSubmit = (value) => {
    onSearchQuery(value.searchMovie);
  };
  return (
    <Formik
      initialValues={formInitialValue}
      validationSchema={MovieSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.formContainer}>
        <label>
          <Field
            type="text"
            name="searchMovie"
            placeholder="Enter search movie's name"
            aria-label="Search movie's name"
          />
          <ErrorMessage component="p" name="searchMovie" />
        </label>
        <button type="submit" aria-label="Search">
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default MovieSearchForm;
