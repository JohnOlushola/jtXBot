"use strict";

import mongoose from "mongoose";
import moment from "moment";
import "dotenv/config";
import Twilio from "twilio";

const ReminderSchema = new mongoose.Schema({
  name: String,
  subject: String,
  event: String,
  context: String,
  reminded: Boolean,
  phoneNumber: String,
  notification: Number,
  timeZone: String,
  time: { type: Date, index: true }
});

ReminderSchema.methods.requiresNotification = date => {
  return (
    Math.round(
      moment(this.time)
        .tz(this.timeZone)
        .utc()
        .diff(moment(date).utc())
        .asMinutes()
    ) === this.notification
  );
};

ReminderSchema.statics.sendReminder = callback => {
  // now
  const searchDate = new Date();

  Reminder.find({}).then(reminders => {
    reminders = reminders.filter(reminder => {
      return reminder.requiresNotification(searchDate);
    });
    if (reminders.length > 0) {
      sendNotifications(reminders);
    }
  });

  /**
   * Send messages to all appoinment owners via Twilio
   * @param {array} reminders List of reminders.
   */
  function sendNotifications(reminders) {
    let accountId = process.env.TWILIO_ID;
    let authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new Twilio(accountId, authToken);

    reminders.forEach(reminder => {
      // Create options to send message
      const options = {
        to: `+ ${reminder.phoneNumber}`,
        body: `Hey ${reminder.name}, this is a reminder for ${reminder.event}, ${reminder.event}, ${reminder.subject}`
      };

      // Send message
      client.messages.create(options, (err, response) => {
        if (err) {
          console.log(err);
        } else {
          let masket = reminder.phoneNumber.substr(
            0,
            reminder.phoneNumber.length - 5
          );
          masked += "*****";
          console.log(`${new Date()}: Message sent to ${masked}`);
        }
      });
    });

    // queued for delivery
    if (callback) {
      callback.call();
    }
  }
};

const Reminders = mongoose.model('reminders', ReminderSchema);
export default Reminders;