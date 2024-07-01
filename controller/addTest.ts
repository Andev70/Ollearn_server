import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Test from "../models/mcqTestModel";
import { Student } from "../models/user/userModel";

export const addOneTest = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    const { token } = req.cookies;
    const { testName, testId, questionCount, classId, subject, duration } =
      req.body;
    if (!token || !authorization || authorization !== process.env.API_SECRET) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "unauthorized user detected",
      });
    }

    if (
      !testName ||
      !testId ||
      !questionCount ||
      !classId ||
      !subject ||
      !duration
    ) {
      return res.status(400).json({
        status: "failed",
        success: false,
        message: "empty fields, value required",
      });
    }

    const jwt_auth: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!jwt_auth) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "token is corrupted! cannot authenticate",
      });
    }
    const user = await Student.findById(jwt_auth?.id);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        success: false,
        message: "No user found try logging in again",
      });
    }
    if (!user?.admin) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "Admin only task! unauthorized",
      });
    }

    const test = await Test.findOne({ testId, testName });
    if (test) {
      return res.status(400).json({
        status: "failed",
        success: false,
        message: "test already present",
      });
    }
    const newTest = await Test.create({
      testName,
      testId,
      duration,
      class: classId,
      subject,
      questionCount: +questionCount,
    });
    if (!newTest) {
      return res.status(400).json({
        status: "failed",
        success: false,
        message: "sorry admin, cannot create a test now!",
      });
    }
    return res.status(201).json({
      success: true,
      newTest,
      status: "ok",
      message: "admin, your test has been added",
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
