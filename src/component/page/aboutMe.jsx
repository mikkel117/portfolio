import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase from "../../Firebase";

const db = getFirestore();

export default function AboutMe() {
  const [skillsData, setSkillsData] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const FetchData = async () => {
    setLoad(true);
    setError(false);
    const skillsItems = [];
    try {
      const getSkillsData = await getDocs(collection(db, "skills"));
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
    document.cookie = `skillsData=${JSON.stringify(skillsItems)}; path=/`;
    setLoad(false);
  };

  useEffect(() => {
    if (!document.cookie.includes("skillsData")) {
      FetchData();
    } else {  
      const cookieData = document.cookie
        .split("; ")
        .find((item) => item.includes("skillsData"))
        .split("skillsData=")[1];
      setSkillsData(JSON.parse(cookieData));
    }
  }, []);

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
              <h2>Om mig</h2>
              <p>
                Jeg er en kreativ og udvikler, som har en stor passion for
                programmering og design. Jeg har en stor interesse for at lære
                nye teknologier og nye metoder.
              </p>
              <p>
                jeg er uddannet som webudvikler på techcollege og er i gang med
                dat data- og kommunikationsuddannelsen med specialisering i
                programmering.
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
