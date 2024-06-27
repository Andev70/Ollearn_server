import { Student } from "../../models/user/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "please provide valid credentials",
      });
    }

    if (!email) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "please provideemail",
      });
    }

    if (!password) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "please provide your password",
      });
    }
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({
        status: "failed",
        success: false,
        message: "no user found with that user name",
      });
    }
    const hashedPassword = student.password;
    const comparedPassword = bcrypt.compareSync(password, hashedPassword);

    if (!comparedPassword) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "Incorrect password try again",
      });
    }
    const jwt_token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("token", jwt_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return res.status(200).json({
      status: "ok",
      success: true,
      jwt_token,
      user: student?._id,
      message: "you are now logged in",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "failed",
      success: false,
      message: "server crashed unexpectedly",
    });
  }
};
