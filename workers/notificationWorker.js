import Reminder from "../src/models/reminder";

const notificationFactoryWorker = () => {
  return {
    new: () => {
      Reminder.sendNotifications();
    }
  };
};

export default notificationFactoryWorker;
