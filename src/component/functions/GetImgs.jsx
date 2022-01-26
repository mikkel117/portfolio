import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase from "../../Firebase";
const GetData = async () => {
  const db = getFirestore();
  let imgData = [];
  let catchError = false;
  try {
    const getImgData = await getDocs(collection(db, "img"));
    getImgData.forEach((doc) => {
      imgData.push(doc.data());
    });
    imgData = imgData[0];
  } catch (error) {
    catchError = true;
  }
  return { imgData, catchError };
};

export default GetData;
