import { Request, Response } from "express";
import { Result } from "../models/user/userTest";
import jwt from "jsonwebtoken";
export const skipQuestion = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    const { token } = req.cookies;
    const { questionNumber, testid, testname } = req.body;
    if (
      !token ||
      !authorization ||
      authorization !== process.env.API_SECRET ||
      !questionNumber ||
      !testid ||
      !testname
    ) {
      return res.status(401).json({
        success: false,
        status: "failed",
        message: "authentication failed! please verify",
      });
    }

    const jwtVerification: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    if (!jwtVerification) {
      return res.status(400).json({
        success: false,
        status: "failed",
        message: "verification failed",
      });
    }

    const pushAnswer = await Result.findOneAndUpdate(
      {
        userId: jwtVerification.id,
        testId: testid,
        testName: testname,
      },
      {
        $push: {
          answers: { $each: ["skiped"], $position: questionNumber - 1 },
        },
      },
      { new: true }
    );

    if (!pushAnswer) {
      return res.status(400).json({
        status: "failed",
        success: false,
        message: "please try later",
      });
    }
    return res.status(201).json({
      status: "ok",
      success: true,
      message: "answer has been skipped",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      status: "failed",
      message: "server crashed unexpectedly",
    });
  }
};
