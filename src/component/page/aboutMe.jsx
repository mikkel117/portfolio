import React, { useState, useEffect } from "react";
import GetData from "../functions/GetImgs";

export default function AboutMe() {
  const [imgData, setImgData] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoad(true);
    const FetchData = async () => {
      const { imgData, catchError } = await GetData();
      if (catchError) {
        setError(true);
      } else {
        setImgData(imgData);
      }
      setLoad(false);
    };
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
          <h1>om mig</h1>
          <div className='about-me-content'>
            {/*  {error ? (
              <p className='error'>failed to connect to firebase</p>
            ) : (
              <img className='about-me-img' src={imgData.url} alt='' />
            )} */}
            <p>
              Jeg er en mand på 22 år der godt kan lide at bruge sin tid foran
              en computer.
              <br />
              Jeg spiller tit med nogle venner hvor vi spiller sammen mod andre.
              <br />
              Jeg går normalt i skydeklup og går til hardball/softgun.
              <br />
              Jeg er god til at komme op med løsninger på eventuelle problemer.
              Jeg er pligtopfyldende og er næsten altid i godt humør.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
