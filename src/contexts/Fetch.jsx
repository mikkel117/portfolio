import React, { createContext, useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// eslint-disable-next-line
import firebase from "../Firebase";

export const FetchContext = createContext();

const db = getFirestore();

const FetchContextProvider = (props) => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [skillsData, setSkillsData] = useState([]);
  const [imgData, setImgData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [uPlanData, setUPlanData] = useState([]);

  const FetchData = async () => {
    setLoad(true);
    setError(false);
    const skillsItems = [];
    const postItems = [];
    const uPlanItems = [];
    try {
      const getSkillsData = await getDocs(collection(db, "skills"));
      const getImgData = await getDocs(collection(db, "img"));
      const getPostsData = await getDocs(collection(db, "posts"));
      const getUPLan = await getDocs(collection(db, "Uddannelsesplan"));

      getUPLan.forEach((doc) => {
        uPlanItems.push(doc.data());
      });

      getPostsData.forEach((doc) => {
        postItems.push(doc.data());
      });

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
    uPlanItems.sort(function (a, b) {
      return a.index - b.index;
    });
    postItems.sort(function (a, b) {
      return a.index - b.index;
    });
    skillsItems.sort(function (a, b) {
      return a.index - b.index;
    });
    setUPlanData(uPlanItems);
    setPostData(postItems);
    setSkillsData(skillsItems);

    setLoad(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <FetchContext.Provider
      value={{ skillsData, imgData, load, error, postData, uPlanData }}>
      {props.children}
    </FetchContext.Provider>
  );
};

export default FetchContextProvider;
