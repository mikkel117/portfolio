import React from "react";

export default function footer() {
  return (
    <footer className='footer'>
      <a href='https://github.com/mikkel117' target='_blank' rel='noreferrer'>
        <i className='fab fa-github fa-2x'></i>
      </a>
      <p>email: mjakobsen034@gmail.com</p>
      <a
        href='https://www.linkedin.com/in/mikkel-jakobsen-6085971ab/'
        target='_blank'
        rel='noreferrer'>
        {" "}
        <i className='fab fa-linkedin fa-2x'></i>
      </a>
    </footer>
  );
}
