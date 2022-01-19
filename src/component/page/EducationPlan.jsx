import React, { useContext } from "react";
import { FetchContext } from "../../contexts/Fetch";

export default function EducationPlan() {
  const { uPlanData } = useContext(FetchContext);
  const { load } = useContext(FetchContext);
  const { error } = useContext(FetchContext);

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
