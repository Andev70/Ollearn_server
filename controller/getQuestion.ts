import { Request, Response } from "express";
import Test from "../models/mcqTestModel";
import Question from "../models/questionModel";
export const getOneQuestion = async (req: Request, res: Response) => {
  try {
    const authentication = req.headers.authorization;
    const { classid, testname, testid } = req.params;
    const { pageKey }: any = req.query;

    const numPagekey = +pageKey;
    if (!authentication) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "authentication failed",
      });
    }

    if (authentication !== process.env.API_SECRET) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "authentication failed",
      });
    }
    if (!classid || !testname || !testid || !pageKey) {
      return res.status(404).json({
        status: "failed",
        success: false,
        message: "404 Not Found",
      });
    }
    const test = await Test.findById(testid);
    const question = await Question.findOne({
      testId: testid,
      questionNumber: numPagekey,
    });

    if (!test) {
      return res.status(404).json({
        status: "failed",
        success: false,
        message: "no test found with that testid",
      });
    }
    if (!question) {
      return res.status(404).json({
        status: "failed",
        success: false,
        message: "404 Not Found",
      });
    }

    if (numPagekey === test?.questionCount) {
      return res.status(200).json({
        status: "ok",
        success: true,
        message: `question number ${pageKey} is provided`,

        lastQuestion: true,
        question,
      });
    } else {
    }

    return res.status(200).json({
      status: "ok",
      success: true,
      message: `question number ${pageKey} is provided`,
      question,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      status: "failed",
      success: false,
      message: "Server crashed for unknown reason",
    });
  }
};
