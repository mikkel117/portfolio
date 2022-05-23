import React, { useEffect, useState } from "react";
import Fetch from "../functions/Fetch";
import GetDate from "../functions/Date";

import moment from "moment";
import Moment from "react-moment";
import "moment-timezone";

export default function EducationPlan() {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [uPlanData, setUPlanData] = useState([]);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setLoad(true);
    const FetchData = async () => {
      const { data, catchError } = await Fetch("Uddannelsesplan");
      if (catchError) {
        setError(true);
      } else {
        const getDate = await GetDate(data);
        setUPlanData(getDate.newItemArray);
      }
      setLoad(false);
    };
    FetchData();
  }, []);

  /*   useEffect(() => {
    const date = moment(); //.format("DD-MM-YYYY");
    console.log("====================================");
    console.log(date.format("DD-MM-YYYY"));
    console.log("====================================");

    const dateA = moment("20-05-2022", "DD-MM-YYYY");
    const dateB = moment("30-05-2022", "DD-MM-YYYY");
    const dateC = date.isBetween(dateA, dateB);
    console.log(dateC);
  }, []); */

  const IsBefore = {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    fontWeight: "bold",
    borderRadius: "5px",
    padding: "5px",
  };

  const IsAfter = {
    /* gray with opacity */
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    fontWeight: "Light",
    borderRadius: "20px",
    padding: "5px",
    /* textDecoration: test(), */
  };

  const IsBetween = {
    backgroundColor: "rgba(155, 255, 66, 0.7)",
    fontWeight: "bold",
    borderRadius: "10px",
    padding: "5px",
  };

  const IsBeforeText = {
    fontWeight: "100",
    fontStyle: "italic",
    fontSize: "1.3rem",
  };

  const IsAfterText = {
    fontWeight: "100",
    fontStyle: "italic",
    fontSize: "1rem",
  };

  const IsBetweenText = {
    fontWeight: "bolder",
  };

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
                      <li
                        key={data.index}
                        style={
                          data.isBefore
                            ? IsBefore
                            : data.isAfter
                            ? IsAfter
                            : data.isBetween
                            ? IsBetween
                            : null
                        }
                        onMouseOver={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}>
                        <h2
                          style={
                            data.isBefore
                              ? IsBeforeText
                              : data.isAfter
                              ? IsAfterText
                              : data.isBetween
                              ? IsBetweenText
                              : null
                          }>
                          {data.text}
                        </h2>{" "}
                        <p
                          className='time'
                          style={
                            data.isBefore
                              ? IsBeforeText
                              : data.isAfter
                              ? IsAfterText
                              : data.isBetween
                              ? IsBetweenText
                              : null
                          }>
                          {data.date}
                        </p>
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
