import { Student } from "../../models/user/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
export const signupStudent = async (req:Request, res:Response) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !username || !password) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "empty field please provide credentials",
      });
    }

    const exitUser = await Student.findOne({ email });
    if (exitUser) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "user already exists",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassowrd = bcrypt.hashSync(password, salt);
    const newStudent = await Student.create({
      password: hashedPassowrd,
      email,
      username,
    });
    if (!newStudent) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "cannot create student right now. try again later",
      });
    }

    const jwt_token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });
    res.cookie("token", jwt_token, {
      httpOnly: true,
      maxAge: 90000000,
      secure:false
    });
    return res.status(201).json({
      status: "ok",
      success: true,
      jwt_token,
      user:newStudent?._id,
      message: "you are now a learner student",
      token:jwt_token,
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
