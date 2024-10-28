import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { createSubscriber, deleteManySubscriber, deleteSubscriber, findAllSubscribers, findAndUpdateSubscriber, findSubscriber } from "../service/subscriber.service";
import { CreateSubscriberInput, UpdateSubscriberInput } from "../schema/subscriber.schema";
import { FilterQuery } from "mongoose";
import { SubscriberDocument } from "../models/subscriber.model";
import colors from "colors";
import nodemailer from "nodemailer";
export async function createSubscriberHandler(req: Request<{}, {}, CreateSubscriberInput["body"]>, res: Response, next: NextFunction) {
  try {
    const isAlreadyExist = await findSubscriber({ email: req.body.email });

    if (isAlreadyExist) {
      return res.status(409).json({
        status: "failure",
        msg: "You are already subscribed.",
      });
    }

    const response = await createSubscriber(req.body);

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: response,
    });
  } catch (error: any) {
    console.error(colors.red(error.message));
    next(new AppError("Internal server error", 500));
  }
}


export async function updateSubscriberHandler(req: Request<UpdateSubscriberInput["params"]>, res: Response, next: NextFunction) {
  try {
    const subscriberId = req.params.subscriberId;
    const subscriber = await findSubscriber({ subscriberId });

    if (!subscriber) {
      return res.status(404).json({
        status: "failure",
        msg: "Subscriber does not exist",
      });
    }

    const updatedItem = await findAndUpdateSubscriber({ subscriberId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedItem,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getSubscriberHandler(req: Request<UpdateSubscriberInput["params"]>, res: Response, next: NextFunction) {
  try {
    const subscriberId = req.params.subscriberId;
    const subscriber = await findSubscriber({ subscriberId });

    if (!subscriber) {
      return res.status(404).json({
        status: "failure",
        msg: "Subscriber does not exist",
      });
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: subscriber,
    });
  } catch (error: any) {
    console.error(colors.red(error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteSubscriberHandler(req: Request<UpdateSubscriberInput["params"]>, res: Response, next: NextFunction) {
  try {
    const subscriberId = req.params.subscriberId;
    const subscriber = await findSubscriber({ subscriberId });

    if (!subscriber) {
      return res.status(404).json({
        status: "failure",
        msg: "Subscriber does not exist",
      });
    }

    await deleteSubscriber({ subscriberId });
    return res.json({
      status: "success",
      msg: "Delete success",
      data: {},
    });
  } catch (error: any) {
    console.error(colors.red(error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllSubscriberHandler(req: Request<{}, {}, {}, FilterQuery<SubscriberDocument>>, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const results = await findAllSubscribers(query as any);

    return res.status(200).json({
      status: "success",
      msg: "Get all items success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red(error.message));
    next(new AppError("Internal server error", 500));
  }
}


export async function replySubscriberHandler(req: Request, res: Response, next: NextFunction) {
  try {

    let attachments: any = [];
    let uploadedFileUrls: any = [];
    if (req.body.images && req.body.images.length > 0) {


      attachments = req?.body?.images?.map((url: any) => ({
        path: url, // Assuming 'url' is the URL of the uploaded file
      }));
    }

    // Send email with attachments
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as string,
      port: parseInt(process.env.SMTP_PORT as string, 10), // Ensure port is an integer
      secure: process.env.SMTP_SECURE === "true", // Convert secure to boolean
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
      },
    });

    const info = await transporter.sendMail({
      from: "Contour Expeditions",
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.message,
      attachments: attachments || [],
    });

    console.log(attachments);
    console.log(info)


    return res.status(200).json({
      status: "success",
      msg: "Reply sent ",

    });
  } catch (error: any) {
    console.error(colors.red(error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManySubscriberHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
    if (req.body.id) {
      await deleteManySubscriber({ subscriberId: { $in: req.body.id } });
      return res.json({
        status: "success",
        msg: "Delete success",
        data: {},
      });
    }
    else {
      return res.json({
        status: "error",
        msg: "Delete error",
        data: {},
      });
    }

  } catch (error: any) {
    console.error(colors.red(error.message));
    next(new AppError("Internal server error", 500));
  }
}