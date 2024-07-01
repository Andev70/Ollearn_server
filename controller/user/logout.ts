import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        status: "failed",
        success: false,
        message: "unauthorized user",
      });
    }
    res.clearCookie("token");

    return res.status(200).json({
      status: "ok",
      success: true,
      message: "logout successfull",
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
