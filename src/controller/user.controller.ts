import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import {
  createUser,
  deleteUser,
  findAllUser,
  findAllUserExceptAdmin,
  findAndUpdateUser,
  findManyUser,
  findUser,
  validatePassword,
} from "../service/user.service";
import { generateHashedPassword } from "../utils/generateHashedPassword";
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from "../schema/user.schema";
var colors = require("colors");
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import UserModel from "../models/user.model";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { createNotification } from "../service/notification.service";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const existingUserWithEmail = await findUser({ email: req.body.email });
    if (existingUserWithEmail) {
      return res.status(409).json({
        status: "error",
        msg: "User with this email already exists",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const message = `
<div style="text-align: center; margin-bottom: 20px;">
 <h2>Verify Your Email</h2>
 <p>Please click the button below to verify your email address:</p>
 <a class="verify-button" href="${process.env.FRONTEND_URL}/verify-email/${token}" style="padding: 10px 20px; background-color: #f97316; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
</div>
`;
    const info = await sendEmail({
      to: req.body.email,
      subject: "Email Verification",
      message: message,
    });

    const hashedPassword = await generateHashedPassword(req.body.password);
    const createdUser = await createUser({
      ...req.body,
      password: hashedPassword,
      verifyToken: token,
      isVerified: false,
    });

    return res.status(201).json({
      status: "success",
      msg: "Register success",
      data: createdUser,
      info: info,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function createRoleSpecificUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const existingUserWithEmail = await findUser({ email: req.body.email });
    if (existingUserWithEmail) {
      return res.status(409).json({
        status: "error",
        msg: "User with this email already exists",
      });
    }

    const hashedPassword = await generateHashedPassword(req.body.password);
    const createdUser = await createUser({
      ...req.body,
      password: hashedPassword,
      isVerified: true,
      verifyToken: "",
    });

    return res.status(201).json({
      status: "success",
      msg: "Register success",
      data: createdUser,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function loginUserHandler(
  req: Request<{}, {}, LoginUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    // Find the user by email
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        msg: "User does not exist with this email",
      });
    }

    // Check if the user is verified
    if (!user.isVerified || user.verifyToken !== "") {
      return res.status(400).json({
        status: "error",
        msg: "Please verify your email first to login",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        msg: "Invalid credentials",
      });
    }
    console.log(user);

    // // Generate a token with the user payload and secret key
    // const accessToken = jwt.sign(
    //   { user: user._id, role:user.role }, // Store user ID or any other relevant data
    //   process.env.AUTH_SECRET_KEY as string,
    //   { expiresIn: "1d" }
    // );
    // Generate a token with the user payload and secret key
    const accessToken = jwt.sign({ user }, `${process.env.AUTH_SECRET_KEY}`, {
      expiresIn: "45d",
    });

    return res.status(200).json({
      msg: "Login success",
      success: true,
      accessToken: accessToken,
      user: user,
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateUserHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const update = req.body;

    const user = await findUser({ userId });
    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    const updatedUser = await findAndUpdateUser({ userId }, update, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateRoleSpecificUserHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const update = req.body;

    const user = await findUser({ userId });
    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    const updatedUser = await findAndUpdateUser({ userId }, update, {
      new: true,
    });

    res.send({
      status: "success",
      msg: "Update success",
      data: updatedUser,
    });

    const notification = await createNotification({
      title: `${user?.firstName ? user?.firstName : ""} ${
        user?.middleName ? user?.middleName : ""
      } ${user?.lastName ? user?.lastName : ""} of role ${
        user?.role
      } updated availability.`,
    });
    console.log(notification);
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getUserHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const user = await findUser({ userId });

    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: user,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filter = req.query;
    const users = await findAllUser(filter);
    return res.json({
      status: "success",
      msg: "Get all user success",
      data: users,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllUserExceptAdminHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await findAllUserExceptAdmin();
    return res.json({
      status: "success",
      msg: "Get all user success",
      data: users,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getRoleSpecificUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filter = req.query;
    const users = await findAllUser({
      role: { $nin: ["user", "admin", "super-admin"] },
    });
    return res.json({
      status: "success",
      msg: "Get all user success",
      data: users,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
export async function deleteUserHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const user = await findUser({ userId });

    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    await deleteUser({ userId });
    return res.json({
      status: "success",
      msg: "Delete success",
      data: {},
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // my custom header
  const token = req.header("Authorization");
  console.log(token);
  console.log("this 11");
  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(token, `${process.env.AUTH_SECRET_KEY}`);
    // Attach the decoded payload to the request for later use in the route handlers
    req.user = decoded;
    console.log(decoded);

    next();
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    return res.status(403).json({ error: true, message: "Invalid token" });
  }
};

export async function getUserFromTokenHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const decodedUser: any = req.user;
    console.log(decodedUser, "xxxxxxxxx");
    // const user: any = await findUser({ userId: decodedUser?.user?.userId });
    const user: any = await findUser({ _id: decodedUser?.user });
    console.log(user, "yyyyyyyyyyyy");
    return res.json({
      status: "success",
      msg: "Get user from token success",
      data: { user: user },
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function verifyEmailHander(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await UserModel.findOne({ verifyToken: req.params.token });
    console.log(req.params.token);

    if (!user) {
      next(new AppError("Token does not exist", 404));
    }

    const updated = await UserModel.findOneAndUpdate(
      { verifyToken: req.params.token },
      { isVerified: true, verifyToken: "" },
      { new: true }
    );

    return res.json({
      status: "success",
      msg: "Verify success",
      data: updated,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getUserByUsernameHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const username = req.params.username;
    const user = await findUser({ username });

    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: user,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "samir@webxnep.com",
    pass: "WebXSamir@001",
  },
});

const sendEmail = async ({ to, subject, message }: any) => {
  try {
    const info = await transporter.sendMail({
      from: '"Contour Expedition" <samir@webxnep.com>', // sender address
      to,
      subject,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
          <!-- Header Section -->
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #f97316; margin: 0;">Contour</h2>
            <p style="font-size: 16px; color: #555;">${subject}</p>
          </div>
          
          <!-- Content Section -->
          <div style="padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 16px; margin: 0;">
              ${message}
            </p>
          </div>
          
          <!-- Footer Section -->
          <div style="margin-top: 20px; text-align: center; color: #777;">
            <p style="font-size: 14px; margin: 10px 0;">
              Thank you for being a valued customer.
            </p>
           <p style="font-size: 14px; margin: 10px 0;">
              <strong>Contour</strong><br />
              Phone: <a href="tel:9864755749" style="color: #f97316;">9864755749</a> | Email: <a href="mailto:Contour Expedition@gmail.com" style="color: #f97316;">Contour Expedition@gmail.com</a>
            </p>
            <div style="margin-top: 10px;">
              <a href="https://www.facebook.com/" style="margin: 0 5px; color: #f97316;"><img src="https://img.icons8.com/ios-filled/50/000000/facebook.png" alt="Facebook" style="width: 24px; height: 24px;"/></a>
              <a href="https://www.facebook.com/" style="margin: 0 5px; color: #f97316"><img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter" style="width: 24px; height: 24px;"/></a>
              <a href="https://www.facebook.com/" style="margin: 0 5px; color: #f97316"><img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px;"/></a>
              <a href="https://www.facebook.com/" style="margin: 0 5px; color: #f97316"><img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" style="width: 24px; height: 24px;"/></a>
            </div>
            <p style="font-size: 12px; margin-top: 20px; color: #aaa;">
              This email was sent by contour You are receiving this email because you opted in at our website.
            </p>
          </div>
        </div>
      </div>`,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export async function getUserAvailabilityHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { startDate, endDate } = req.body;
    console.log(req.body);
    const user = await findManyUser({
      availability: {
        $elemMatch: {
          startDate: { $gte: startDate },
          endDate: { $lte: endDate },
        },
      },
    });
    console.log(user);

    return res.json({
      status: "success",
      msg: "Get success",
      data: user,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateUserPasswordByAdminHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;

    const user = await findUser({ userId });
    if (!user) {
      next(new AppError("User does not exist", 404));
    }

    const hashedPassword = await generateHashedPassword(req.body.password);
    const updatedUser = await findAndUpdateUser(
      { userId },
      { password: hashedPassword },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updatePasswordHandler(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.params.email;
    console.log(req.body);
    console.log(email);

    const user = await findUser({ email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        msg: "User with this email does not exist",
      });
    }

    const hashedPassword = await generateHashedPassword(req.body.password);
    const updatedUser = await findAndUpdateUser(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
