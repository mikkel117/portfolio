import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className='notFound'>
      <h1>404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        Go back to the <Link to='/'>homepage</Link>
      </p>
    </section>
  );
}

export default NotFound;
