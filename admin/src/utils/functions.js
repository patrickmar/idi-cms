import moment from "moment";

export const Greeting = () => {
    const time = moment().hours()
    if (time < 10) {
        return "Good Morning,";
      }else if (time < 16) {
        return "Good Afternoon,";
      } else if (time < 20) {
        return "Good Evening,";
      } else {
        return "Good Evening,";
      }
}
