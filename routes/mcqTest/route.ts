import { createResult } from "../../controller/createResult";
import express from "express";
import { GetAllTests } from "../../controller/getTests";
import { getOneQuestion } from "../../controller/getQuestion";
import { getTestResult } from "../../controller/getResult";
import { pushResult } from "../../controller/pushResult";
import { skipQuestion } from "../../controller/skipQuestion";
const mcqTestRouter = express.Router();

mcqTestRouter.route("/tests/unique").get(GetAllTests);
mcqTestRouter
  .route("/get-question/:classid/:testname/:testid")
  .get(getOneQuestion);
mcqTestRouter.route("/create/result").post(createResult);
mcqTestRouter.route("/get/result").post(getTestResult);
mcqTestRouter.route("/push/answer").post(pushResult);
mcqTestRouter.route("/skip/answer").post(skipQuestion);
export { mcqTestRouter };
