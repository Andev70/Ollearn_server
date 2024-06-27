import { Result } from "../models/user/userTest";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
export const createResult = async (req: Request, res: Response) => {
  try {
    const { testname, testid } = req.body;
    const { authorization } = req.headers;
    const { token } = req.cookies;
    if (!authorization || !testid || !testname) {
      return res.status(401).json({
        success: false,
        status: "failed",
        message: "unauthorized user",
      });
    }
    if (process.env.API_SECRET !== authorization) {
      return res.status(401).json({
        success: false,
        status: "failed",
        message: "unauthorized user",
      });
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        status: "failed",
        message: "unauthorized user",
      });
    }
    const jwtVerified: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    if (!jwtVerified) {
      return res.status(401).json({
        success: false,
        status: "failed",
        message: "unauthorized user",
      });
    }
    const existingUserTest = await Result.findOne({
      testId: testid,
      testName: testname,
      userId: jwtVerified.id,
    });
    if (existingUserTest) {
      const emptyResult = await Result.findOneAndUpdate(
        { testId: testid, testName: testname, userId: jwtVerified.id },
        { answers: [] }
      );

      return res.status(201).json({ success: true, status: "ok" });
    }

    const createdRes = await Result.create({
      testId: testid,
      testName: testname,
      userId: jwtVerified.id,
      answers: [],
    });
    if (!createdRes) {
      return res.status(400).json({
        status: "failed",
        success: false,
        message: "cant create test right now try later",
      });
    }

    return res.status(201).json({
      success: true,
      status: "ok",
      message: "test has been inisialized",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      status: "failed",
      message: "Server crached unexpectedly",
    });
  }
};
