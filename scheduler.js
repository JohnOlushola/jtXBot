import CronJob from "cronjob";
import notificationWorker from "./workers/notificationWorker";
import moment from "moment";

const scheduleFactory = () => {
  return {
    start: () => {
      new CronJob(
        "00 * * * * *",
        () => {
          console.log(
            `Running notifications for ${moment().format("H:mm ")}`
          );
          notificationWorker.run();
        },
        null,
        true,
        ""
      );
    }
  };
};

export default scheduleFactory();