import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { rootLogger } from "./logger";
import { Env, validateEnv } from "./env";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
dotenv.config();

validateEnv();
const env = Env();

const app = express();

if (env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  rootLogger.info(`Listening on ${PORT}`);
});
