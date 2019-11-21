import reminder from "../models/reminder"

/**
 * @class Reminder
 * @description class will implement reminder functions
 */

const reminders = [];

class Reminder {
  /**
   * @memberof Reminder
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */

  static setTime(message) {}

  static setEvent(message) {}

  static setContext(message) {}

  static setSubject(message) {}

  // POST: set reminder
  static setReminder(message) {
    let time = this.setTime(message);
    let event = this.setTime(message);
    let context = this.setContext(message);
    let subject = this.setSubject(message);

    let reminder = { time, event, context, subject };

    reminders.push(reminder);
  }

  static getReminders(){

  }

  static sendReminder(reminder) {
    // get reminder
  }
}

export default new Reminder();
