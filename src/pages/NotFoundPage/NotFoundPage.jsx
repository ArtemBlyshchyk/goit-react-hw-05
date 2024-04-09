// import css from './NotFoundPage.module.css'

import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>Page you visited doesn&apos;t exist</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFoundPage;
