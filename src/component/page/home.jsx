import React, { useContext } from "react";
import { FetchContext } from "../../contexts/Fetch";

export default function Home() {
  const { skillsData } = useContext(FetchContext);
  const { imgData } = useContext(FetchContext);
  const { load } = useContext(FetchContext);
  const { error } = useContext(FetchContext);

  return (
    <div className='home'>
      <div className='wrapper-icon'>
        {error ? (
          <p className='error'>failed to connect to firebase</p>
        ) : (
          <>
            {load ? (
              <div className='loader'>Loading...</div>
            ) : (
              <img className='profail' src={imgData.url} alt='' />
            )}
          </>
        )}

        <h1>
          {" "}
          <span className='typing'> Mikkel Jakobsen </span>
        </h1>
        <p>
          {" "}
          <span> DEVELOPER </span>
        </p>
      </div>

      <div className='skills'>
        <h2>skills </h2>
        {error ? (
          <p className='error'>failed to connect to firebase</p>
        ) : (
          <>
            {load ? (
              <div className='loader'>Loading...</div>
            ) : (
              <ul>
                {skillsData &&
                  skillsData.map((data) => {
                    return (
                      <li>
                        <i className={data.class}></i>
                        <p>{data.text}</p>
                      </li>
                    );
                  })}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
