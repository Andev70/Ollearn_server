import express from "express";
import { signupStudent } from "../../controller/user/signup";
import { loginStudent } from "../../controller/user/login";
import { IsAuthenticatedUser } from "../../controller/user/authentication";
import { logout } from "../../controller/user/logout";
const studentRouter = express.Router();

studentRouter.route("/signup").post(signupStudent);
studentRouter.route("/login").post(loginStudent);
studentRouter.route("/authentication").post(IsAuthenticatedUser);
studentRouter.route("/logout").get(logout);
export default studentRouter;
