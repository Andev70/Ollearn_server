import { Request, Response } from "express";
import Test from "../models/mcqTestModel";
export const GetAllTests = async (req:Request, res:Response) => {
  try {
    // real code
    const authentication = req.headers.authorization;

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

    const tests = await Test.find();
    if (!tests) {
      return res.status(404).json({
        status: "failed",
        success: false,
        message: "",
      });
    }

    return res.status(200).json({
      status: "ok",
      success: true,
      message: "all tests are provided",
      tests,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      status: "failed",
      success: false,
      message: "Internal error",
    });
  }
};
