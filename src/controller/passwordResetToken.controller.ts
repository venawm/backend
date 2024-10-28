import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreatePasswordResetTokenInput, UpdatePasswordResetTokenInput } from "../schema/passwordResetToken.schema";
import { createPasswordResetToken, findAndUpdatePasswordResetToken, findPasswordResetToken } from "../service/passwordResetToken.schema";
var colors = require("colors");

// Create Password Reset Token Handler
export async function createPasswordResetTokenHandler(req: Request<{}, {}, CreatePasswordResetTokenInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    console.log(body)

    const passwordResetToken = await createPasswordResetToken(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: passwordResetToken,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

// Update Password Reset Token Handler
export async function updatePasswordResetTokenHandler(req: Request<UpdatePasswordResetTokenInput["params"]>, res: Response, next: NextFunction) {
  try {
    const email = req.params.passwordResetTokenId;
    const passwordResetToken = await findPasswordResetToken({ email });

    if (!passwordResetToken) {
      return next(new AppError("Password reset token does not exist", 404));
    }

    const updatedPasswordResetToken = await findAndUpdatePasswordResetToken({ email }, req.body, { new: true });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedPasswordResetToken,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

// Get Password Reset Token Handler
export async function getPasswordResetTokenHandler(req: any, res: Response, next: NextFunction) {
  try {
    console.log(req.params);
    const token = req.params.token;
    console.log(token);

    const passwordResetToken = await findPasswordResetToken({ token });
    console.log(passwordResetToken);

    if (!passwordResetToken) {
      return next(new AppError("Password reset token does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: passwordResetToken,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}





