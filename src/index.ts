import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { rootLogger } from "./logger";
import { validateEnv } from "./env";
dotenv.config();

validateEnv();

const app = express();

app.use(morgan("dev"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  rootLogger.info(`Listening on ${PORT}`);
});
