import React, { useState, useEffect } from "react";
import GetData from "../functions/GetImgs";
import Fetch from "../functions/Fetch";

export default function Home() {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [skillsData, setSkillsData] = useState([]);
  const [imgError, setImgError] = useState(false);
  const [imgData, setImgData] = useState([]);

  useEffect(() => {
    setLoad(true);
    const ImgData = async () => {
      const { imgData, catchError } = await GetData();
      if (catchError) {
        setImgError(true);
      } else {
        setImgData(imgData);
      }
    };
    const FetchData = async () => {
      const { data, catchError } = await Fetch("skills");
      if (catchError) {
        setError(true);
      } else {
        setSkillsData(data);
      }
      setLoad(false);
    };
    ImgData();
    FetchData();
  }, []);

  return (
    <section className='home'>
      {load ? (
        <div className='loading'>
          <div className='loader'>Loading...</div>
        </div>
      ) : (
        <>
          <div className='banner'>
            {imgError ? (
              <p className='error'>failed to connect to firebase</p>
            ) : (
              <>
                <img className='profail' src={imgData.url} alt='' />
              </>
            )}
            <h1>Mikkel Jakobsen</h1>
          </div>
          <div className='home-about-me-container'>
            <p className='typing spacle'>
              webudvikler og datatekniker med speciale i programmering
            </p>
            <div className='home-about-me-text'>
              <p>
                Jeg er en kreativ og udvikler, som har en stor passion for
                programmering og design. Jeg har en stor interesse for at lære
                nye teknologier og nye metoder.
              </p>
              <p>
                jeg er uddannet som webudvikler på techcollege og er i gang med
                at blive en datatekniker med specialisering i programmering.
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
                            <li key={data.index}>
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
