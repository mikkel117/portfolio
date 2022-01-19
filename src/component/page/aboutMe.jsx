import React, { useContext } from "react";
import { FetchContext } from "../../contexts/Fetch";

export default function AboutMe() {
  const { skillsData } = useContext(FetchContext);
  const { load } = useContext(FetchContext);
  const { error } = useContext(FetchContext);
  return (
    <section className='about-me'>
      {load ? (
        <div className='loading'>
          <div className='loader'>Loading...</div>
        </div>
      ) : (
        <>
          <div className='about-me-container'>
            <div className='about-me-text'>
              <h2>About Me</h2>
              <p>
                I am a self-taught developer with a passion for creating
                applications. I have a strong desire to learn and grow as a
                developer. I am currently working on my first project as a
                developer.
              </p>
              <p>
                I am a self-taught developer with a passion for creating
                applications. I have a strong desire to learn and grow as a
                developer. I am currently working on my first project as a
                developer.
              </p>
            </div>
            <div className='skills'>
              <h2>skills</h2>
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
        </>
      )}
    </section>
  );
}
