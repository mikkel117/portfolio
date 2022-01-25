import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase from "../../Firebase";

export default function Home() {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [imgData, setImgData] = useState([]);

  const db = getFirestore();

  const FetchData = async () => {
    setLoad(true);
    setError(false);
    try {
      const getImgData = await getDocs(collection(db, "img"));
      getImgData.forEach((doc) => {
        setImgData(doc.data());
      });
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
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
            {/*             <div>
              <h1>Mikkel Jakobsen</h1>
              <p>webudvikler og datatekniker med speciale i programmering</p>
            </div> */}
          </div>
        </>
      )}
    </section>
  );
}
