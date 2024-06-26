import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const IsAuthenticatedUser = async (req:Request, res:Response) => {
  try {
    const cookie = req.cookies.token;

    if (!cookie) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "please sign in to access",
      });
    }
    const jwt_token:any = jwt.verify(cookie, process.env.JWT_SECRET as string);

    if (!jwt_token) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "please sign in to access",
      });
    }
    return res.status(200).json({
      success: true,
      status: "ok",
      msg: "you are the owner",
      user: jwt_token.id,
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
