import express from "express";
import cors from "cors";
import passport from "passport";
import errorMiddleware from "./middlewares/error.middleware.ts";
import authRouter from "./routes/auth.router";

const app = express();
app.use(express.json());

const corseOptions = {
  // origin: [
  //   "http://example.com",
  //   "http://localhost:3000",
  //   "http://localhost:5000",
  // ],
  origin: true, // for dev
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corseOptions));
app.use(passport.initialize());

app.use(authRouter);
app.use(errorMiddleware);

export default app;
