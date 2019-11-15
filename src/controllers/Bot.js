import { google } from "googleapis";
import "dotenv/config";
import twilio from "twilio";

const TWILIO_ID = process.env.TWILIO_ID;
const TWILIO_AUTH_TOKEN = process.env.TWILO_AUTH_TOKEN;
const API_KEY = process.env.GOOGLE_API_KEY;
const cx = process.env.SEARCH_ENGINE_KEY;

twilio(TWILIO_ID, TWILIO_AUTH_TOKEN);

const { MessagingResponse } = twilio.twiml;
const customSearch = google.customsearch("v1");

/**
 * @class Bot
 * @description class will implement bot functionality
 */
class Bot {
  /**
   * @memberof Bot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */

  static async googleSearch(req, res, next) {
    console.log(`[${Date.now()}] Incoming message: ${req.body.Body}`);

    const twiml = new MessagingResponse();
    const q = req.body.Body;
    const options = { cx, q, auth: API_KEY };

    try {
      const result = await customSearch.cse.list(options);
      const firstResult = result.data.items[0];
      const searchData = firstResult.snippet;
      const link = firstResult.link;

      twiml.message(`${searchData} ${link}`);

      res.set("Content-Type", "text/xml");

      return res.status(200).send(twiml.toString());
    } catch (error) {
      return next(error);
    }
  }
}

export default Bot;
