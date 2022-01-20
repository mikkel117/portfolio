import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase from "../../Firebase";

const db = getFirestore();

export default function EducationPlan() {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [uPlanData, setUPlanData] = useState([]);

  const FetchData = async () => {
    setLoad(true);
    setError(false);
    const uPlanItems = [];
    try {
      const getUPLan = await getDocs(collection(db, "Uddannelsesplan"));

      getUPLan.forEach((doc) => {
        uPlanItems.push(doc.data());
      });
    } catch (error) {
      console.log("error", error);
      setError(true);
    }
    uPlanItems.sort(function (a, b) {
      return a.index - b.index;
    });
    setUPlanData(uPlanItems);
    setLoad(false);
  };

  useEffect(() => {
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
