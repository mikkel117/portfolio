import React, { useEffect, useState } from "react";
import Fetch from "../functions/Fetch";

export default function EducationPlan() {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [uPlanData, setUPlanData] = useState([]);

  useEffect(() => {
    setLoad(true);
    const FetchData = async () => {
      const { data, catchError } = await Fetch("Uddannelsesplan");
      if (catchError) {
        setError(true);
      } else {
        setUPlanData(data);
      }
      setLoad(false);
    };
    FetchData();
  }, []);

  return (
    <section className='edcationPlan'>
      {load ? (
        <div className='loading'>
          <div className='loader'>Loading...</div>
        </div>
      ) : (
        <>
          <h1>Uddannelsesplan</h1>
          {error ? (
            <p className='error'>failed to connect to firebase</p>
          ) : (
            <>
              <ul>
                {uPlanData &&
                  uPlanData.map((data) => {
                    return (
                      <li key={data.index}>
                        <h2>{data.text}</h2> <p className='time'>{data.date}</p>
                      </li>
                    );
                  })}
              </ul>
            </>
          )}
        </>
      )}
    </section>
  );
}
