import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase from "../../Firebase";

export default function Home() {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [imgData, setImgData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);

  const db = getFirestore();

  const FetchData = async () => {
    setLoad(true);
    setError(false);
    const skillsItems = [];
    try {
      const getImgData = await getDocs(collection(db, "img"));
      const getSkillsData = await getDocs(collection(db, "skills"));
      getImgData.forEach((doc) => {
        setImgData(doc.data());
      });

      getSkillsData.forEach((doc) => {
        skillsItems.push(doc.data());
      });
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
    skillsItems.sort(function (a, b) {
      return a.index - b.index;
    });
    setSkillsData(skillsItems);
    setLoad(false);
  };

  useEffect(() => {
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
            {error ? (
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
