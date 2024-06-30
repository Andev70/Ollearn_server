import express from "express";
import { pushQuestion } from "../../controller/pushQuestion";
const adminRouter = express.Router();
adminRouter.route("/add/question").post(pushQuestion);
export default adminRouter;
