import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Test from "../models/mcqTestModel";
import Question from "../models/questionModel";
import { Student } from "../models/user/userModel";

export const pushQuestion = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    const { token } = req.cookies;
    const { testName, testId, answer, mcq, options, questionNumber } = req.body;
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
      !mcq ||
      !questionNumber ||
      !answer ||
      !options
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

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({
        status: "failed",
        success: false,
        message: "no test found with that test id",
      });
    }
    if (questionNumber > test?.questionCount) {
      return res.status(400).json({
        status: "failed",
        success: false,
        message: "max question limit reached for for the test",
      });
    }
    const question = Question.create({
      testId,
      testName,
      mcq,
      questionNumber,
      answer,
      options,
    });
    if (!question) {
      return res.status(400).json({
        status: "failed",
        success: false,
        message: "cannot create question now.",
      });
    }
    return res.status(201).json({
      question,
      success: true,
      status: "ok",
      message: "your question has been added",
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
