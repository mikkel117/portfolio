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
            {error ? (
              <p className='error'>failed to connect to firebase</p>
            ) : (
              <img className='about-me-img' src={imgData.url} alt='' />
            )}
            <p>
              Condimentum natoque nec facilisi habitant morbi eu letius lorem
              massa augue ex neque aliquam tristique viverra penatibus maecenas
              aliquet sodales euismod praesent dolor et montes congue ipsum
              egestas pretium porta elit lobortis bibendum convallis suscipit
              fames consequat pharetra mauris a suspendisse nulla mus dis
              hendrerit ridiculus velit parturient litora nunc
            </p>
          </div>
        </>
      )}
    </section>
  );
}
