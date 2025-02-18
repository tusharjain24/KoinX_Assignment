import express from "express";
import cors from "cors";
import { expressLimit } from "./constants.js";
import { rateLimit } from "express-rate-limit";
import {healthCheckRouter} from "./routes/healthcheck.routes.js";
import {cryptoRouter} from "./routes/crypto.routes.js";
import job from "./jobs/scheduleJob.js";

const app = express();

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "Rate Limit Exceeded. Please try again in 15 minutes",
});

app.use(limit);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: expressLimit }));
app.use(express.urlencoded({ extended: true, limit: expressLimit }));
app.use(express.static("public"));

job.invoke();

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/crypto", cryptoRouter);


export { app };

