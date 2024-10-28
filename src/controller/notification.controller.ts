import { NextFunction, Request, Response } from "express";
import { CreateNotificationInput, UpdateNotificationInput } from "../schema/notification.schema";
import { createNotification, deleteManyNotification, deleteNotification, findAllNotification, findAndUpdateNotification, findNotification } from "../service/notification.service";
import AppError from "../utils/appError";
import NotificationModel from "../models/notification.model";

var colors = require("colors");



export async function updateNotificationHandler(req: Request<UpdateNotificationInput["params"]>, res: Response, next: NextFunction) {
    try {
        const NotificationId = req.params.notificationId;
        const Notification = await findNotification({ NotificationId });
        if (!Notification) {
            next(new AppError("Notification detail does not exist", 404));
            return;
        }

        const updatedNotification = await findAndUpdateNotification(
            { NotificationId },
            { ...req.body },
            {
                new: true,
            }
        );

        return res.json({
            status: "success",
            msg: "Update success",
            data: updatedNotification,
        });
    } catch (error: any) {
        console.error(colors.red("msg:", error.message));
        next(new AppError("Internal server error", 500));
    }
}

export async function getNotificationHandler(req: Request<UpdateNotificationInput["params"]>, res: Response, next: NextFunction) {
    try {
        const NotificationId = req.params.notificationId;
        const Notification = await findNotification({ NotificationId });

        if (!Notification) {
            next(new AppError("Notification does not exist", 404));
        }

        return res.json({
            status: "success",
            msg: "Get success",
            data: Notification,
        });
    } catch (error: any) {
        console.error(colors.red("msg:", error.message));
        next(new AppError("Internal server error", 500));
    }
}

export async function getUnreadNotificationHandler(req: Request<UpdateNotificationInput["params"]>, res: Response, next: NextFunction) {
    try {
        const data = await NotificationModel.aggregate([
            {
                $match: {
                    isSeen: false
                }
            }, {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ])
        console.log(data);
        const data2 = data.length > 0 ? data[0] : {
            count: 0,

        }
        return res.json({
            status: "success",
            msg: "Get success",
            count: data2?.count,
        });
    } catch (error: any) {
        console.error(colors.red("msg:", error.message));
        next(new AppError("Internal server error", 500));
    }
}

export async function getAllNotificationHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const results = await findAllNotification();
        return res.json({
            status: "success",
            msg: "Get all notification success",
            data: results,
        });
    } catch (error: any) {
        console.error(colors.red("msg:", error.message));
        next(new AppError("Internal server error", 500));
    }
}


export async function markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await NotificationModel.updateMany(
            { isSeen: false },
            {
                $set: {
                    isSeen: true,

                }
            }
        );
        console.log(result);
        return res.json({
            status: "success"
        })
    } catch (error: any) {
        console.error(colors.red("msg:", error.message));
        next(new AppError("Internal server error", 500));
    }
}
export async function deleteNotificationHandler(req: Request<UpdateNotificationInput["params"]>, res: Response, next: NextFunction) {
    try {
      const notificationId = req.params.notificationId;
      const notification = await findNotification({ notificationId });
  
      if (!notification) {
        next(new AppError("Notification does not exist", 404));
      }
  
      await deleteNotification({ notificationId });
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

  export async function deleteManyNotificationHandler(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("hii")
     if(req.body.id){
      await deleteManyNotification({ notificationId:{$in:req.body.id} });
      return res.json({
        status: "success",
        msg: "Delete success",
        data: {},
      });
     }
     else{
      return res.json({
        status: "error",
        msg: "Delete error",
        data: {},
      });
     }
     
    } catch (error: any) {
      console.error(colors.red("msg:", error.message));
      next(new AppError("Internal server error", 500));
    }
  }