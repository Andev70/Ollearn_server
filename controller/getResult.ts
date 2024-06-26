import { Result } from "../models/user/userTest.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const getTestResult = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    const { authorization } = req.headers;
    const { testid, testname } = req.body;
    console.log(token, authorization, testid, testname);
    if (
      !token ||
      !testid ||
      !authorization ||
      !testname ||
      authorization !== process.env.API_SECRET
    ) {
      return res.status(401).json({
        status: "failed",
        statusCode: 401,
        success: false,
        message: "authentication failed",
      });
    }
    const jwt_token: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!jwt_token) {
      return res.status(401).json({
        status: "failed",
        statusCode: 401,
        success: false,
        message: "identification failed",
      });
    }
    const result = await Result.findOne({
      testName: testname,
      testId: testid,
      userId: jwt_token?.id,
    });
    if (!result) {
      return res.status(404).json({
        status: "failed",
        statusCode: 404,
        success: false,
        message: "404 Not Found",
      });
    }
    return res.status(200).json({
      status: "ok",
      statusCode: 200,
      success: true,
      message: "specified users test result provided",
      result,
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
