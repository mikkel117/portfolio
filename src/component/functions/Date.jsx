import moment from "moment";
import Moment from "react-moment";
import "moment-timezone";

const Date = (item) => {
  let newItemArray = [];
  const newDate = moment();
  for (let i = 0; i < item.length; i++) {
    let myArray = item[i].date.split("-");
    let date1 = moment(myArray[0], "DD-MM-YYYY");
    let date2 = moment(myArray[1], "DD-MM-YYYY");
    item[i].isBefore = false;
    item[i].isAfter = false;
    item[i].isBetween = false;
    newItemArray.push(item[i]);

    if (moment(newDate).isBetween(date1, date2)) {
      item[i].isBetween = true;
    } else if (moment(newDate).isAfter(date1)) {
      item[i].isAfter = true;
    } else if (moment(newDate).isBefore(date1)) {
      item[i].isBefore = true;
    }
  }
  return { newItemArray };
};
export default Date;
