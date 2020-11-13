import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(morgan("dev"));

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("string");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
