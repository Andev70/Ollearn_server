import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Test from "../models/mcqTestModel";
import { StaticResult } from "../models/staticResult";
import { Student } from "../models/user/userModel";
export const createStaticResult = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    const { token } = req.cookies;
    const { testName, testId, answers } = req.body;

    if (!token || !authorization || authorization !== process.env.API_SECRET) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "unauthorized user detected",
      });
    }

    if (!testName || !testId || !answers) {
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
    const ifExists = await StaticResult.findOne({ testId });

    if (ifExists) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "static result already present",
      });
    }
    const parseAnswer = JSON.parse(answers);
    const staticResult = await StaticResult.create({
      testId,
      testName,
      answers: parseAnswer,
    });

    if (!staticResult) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "static reslt is not created",
      });
    }
    return res.status(201).json({
      status: "ok",
      success: true,
      message: "static StaticResult added successfully",
      staticResult,
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
