import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
var colors = require("colors");
import nodemailer from "nodemailer";
import { CreateMailInput } from "../schema/mail.schema";

const FRONTEND_URL = "";
export async function sendMailHandler(req: Request<{}, {}, CreateMailInput["body"]>, res: Response, next: NextFunction) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as string,
      port: parseInt(process.env.SMTP_PORT as string, 10), // Ensure port is an integer
      secure: process.env.SMTP_SECURE === "true", // Convert secure to boolean
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
      },
    });

    console.log(req.body);

    const info = await transporter.sendMail({
      from: "Contour Expedition",
      to: req.body.email,
      subject: req.body.subject,
      html: `<div>
      <div class="container">
       <div class="content">
           <p class="heading">${req.body.message}</p>
           
       </div>
       <div class="footer">
           <p>Thanks and Regards, Contour Expedition .</p>
           <p>For any queries contact us here:</p>
          <p>
          <p>Please, visit our Website: 
          <a  href="${FRONTEND_URL}"> contour.com</a>
          </p>
           <p>Phone: +977 9761725425</p>     
   </div>
   </div>
     </div>`,
    });

    return res.status(200).json({
      status: "success",
      msg: "Reply has been sent",
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
