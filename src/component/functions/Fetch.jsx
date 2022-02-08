import { getFirestore, collection, getDocs } from "firebase/firestore";
import "../../Firebase";
const GetData = async (dataC) => {
  const db = getFirestore();
  let data = [];
  let catchError = false;
  try {
    const getDbData = await getDocs(collection(db, `${dataC}`));
    getDbData.forEach((doc) => {
      data.push(doc.data());
    });
  } catch (error) {
    console.log("error", error);
    catchError = true;
  }

  data.sort(function (a, b) {
    return a.index - b.index;
  });

  return { data, catchError };
};

export default GetData;
