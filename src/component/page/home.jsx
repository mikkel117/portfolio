import React, { useContext } from "react";
import { FetchContext } from "../../contexts/Fetch";

export default function Home() {
  const { skillsData } = useContext(FetchContext);
  const { imgData } = useContext(FetchContext);
  const { load } = useContext(FetchContext);
  const { error } = useContext(FetchContext);

  return (
    <section className='home'>
      {/* {load ? (
        <div className='loading'>
          <div className='loader'>Loading...</div>
        </div>
      ) : ( */}
      <>
        <div className='wrapper-icon'>
          {error ? (
            <p className='error'>failed to connect to firebase</p>
          ) : (
            <>
              <img className='profail' src={imgData.url} alt='' />
            </>
          )}
          <p className="test">
            <h1 className='typing'>Mikkel Jakobsen</h1>
          </p>
          <p>
            <span> PROGRAMMØR </span>
          </p>
        </div>

        <div className='skills'>
          <h2>skills</h2>
          {error ? (
            <p className='error'>failed to connect to firebase</p>
          ) : (
            <>
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
            </>
          )}
        </div>
      </>
      {/* )} */}
    </section>
  );
}
