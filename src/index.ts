import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("string");
});

app.listen(5000, () => {
  console.log("listening");
});
