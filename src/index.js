import "dotenv/config";
import express from "express";
import cors from "cors";
import v1Routes from "./routes";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(v1Routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Bot is listnening on ${process.env.PORT}`);
});

export default app;
