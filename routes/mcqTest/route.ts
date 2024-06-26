import { createResult } from "../../controller/createResult";
import express from "express";
import { GetAllTests } from "../../controller/getTests";
import { getOneQuestion } from "../../controller/getQuestion";
import { getTestResult } from "../../controller/getResult";
const mcqTestRouter = express.Router();

mcqTestRouter.route("/tests/unique").get(GetAllTests);
mcqTestRouter
  .route("/get-question/:classid/:testname/:testid")
  .get(getOneQuestion);
mcqTestRouter.route("/create/result").post(createResult);
mcqTestRouter.route("/get/result").post(getTestResult);
export { mcqTestRouter };
