import { Router } from "express";
import Bot from "../../controllers/Bot";

const router = Router();

router.post("/incoming", Bot.googleSearch);

router.get("/incoming", (req, res) => {
  res.send("GET Request");
});

export default router;
