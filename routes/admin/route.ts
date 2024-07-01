import express from "express";
import { addOneTest } from "../../controller/addTest";
import { pushQuestion } from "../../controller/pushQuestion";
import { createStaticResult } from "../../controller/staticResult";
const adminRouter = express.Router();
adminRouter.route("/add/question").post(pushQuestion);
adminRouter.route("/static/result").post(createStaticResult);
adminRouter.route("/add/test").post(addOneTest);
export default adminRouter;
