import express from "express";
import { Express } from "express";
import cors from "cors";
import { connect } from "./db/connect";
import { mcqTestRouter } from "./routes/mcqTest/route";
import cookieParser from "cookie-parser";
import studentRouter from "./routes/student/studentRoute";
const port = process.env.PORT || 8080;

const app: Express = express();

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);
const awaitUntillDbRegister = async () => {
  await connect();

  app.listen(port, () => {
    console.log(`app is running on localhost ${port}`);
  });
};

awaitUntillDbRegister();

app.use("/api/v1/student/", studentRouter);
app.use("/api/v1/", mcqTestRouter);
