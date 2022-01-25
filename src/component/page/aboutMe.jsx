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
    setLoad(false);
  };

  useEffect(() => {
    FetchData();
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
            {/* <div className='about-me-text'></div> */}
            <h2>about me</h2>
          </div>
        </>
      )}
    </section>
  );
}
