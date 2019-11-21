import { Router } from "express";
import Bot from "../../controllers/Bot";

const router = Router();

router.post("/incoming", Bot.googleSearch);
// router.post("/incoming", (req, res) => {
//   console.log("POST Request");
//   res.json({
//     message: "Reaching endpoint",
//     body: req.body.Body
//   });
// });
router.get("/incoming", (req, res) => {
  res.send("GET Request");
});

export default router;
