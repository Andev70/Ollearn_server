import express from "express";
import { signupStudent } from "../../controller/user/signup";
import { loginStudent } from "../../controller/user/login";
import { IsAuthenticatedUser } from "../../controller/user/authentication";
const studentRouter = express.Router();

studentRouter.route("/signup").post(signupStudent);
studentRouter.route("/login").post(loginStudent);
studentRouter.route("/authentication").post(IsAuthenticatedUser);
export default studentRouter;
