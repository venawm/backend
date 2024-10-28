import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateActivityInput, UpdateActivityInput } from "../schema/activity";
import { createActivity, findActivity, findAndUpdateActivity, deleteActivity, findAllActivity, deleteManyActivity } from "../service/activity.service";
import ActivityModel from "../models/activity.model";
var colors = require("colors");

export async function createActivityHandler(req: Request<{}, {}, CreateActivityInput["body"]>, res: Response, next: NextFunction) {
  try {
 
    const body = req.body;
    console.log(body);

     // Check if an activity with the same name or slug already exists
     const existingActivity = await ActivityModel.findOne({
      $or: [{ name: body.name }, { slug: body.slug }],
    });

    if (existingActivity) {
      return res.status(400).json({
        status: "fail",
        msg: "Activity with the same name or slug already exists",
      });
    }

    const activity = await createActivity({ ...body});

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: activity,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateActivityHandler(req: Request<UpdateActivityInput["params"]>, res: Response, next: NextFunction) {
  try {
 

    const activityId = req.params.activityId;
    const activity = await findActivity({ activityId });

    if (!activity) {
      next(new AppError("Activity does not exist", 404));
      return;
    }

   
    const updatedActivity = await findAndUpdateActivity(
      { activityId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedActivity,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getActivityHandler(req: Request<UpdateActivityInput["params"]>, res: Response, next: NextFunction) {
  try {
    const activityId = req.params.activityId;
    const activity = await findActivity({$or:[{activityId},{slug:activityId}]  });

    if (!activity) {
      next(new AppError("activity does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: activity,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteActivityHandler(req: Request<UpdateActivityInput["params"]>, res: Response, next: NextFunction) {
  try {
    const activityId = req.params.activityId;
    const activity = await findActivity({ activityId });

    if (!activity) {
      next(new AppError("activity does not exist", 404));
    }

    await deleteActivity({ activityId });
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

export async function getAllActivityHandler(req: Request, res: Response, next: NextFunction) {
  try {


    const { filter, sortBy, order, select } = req.body;
    const sortOptions: any = {};
    if (sortBy && order) {
      sortOptions[sortBy] = order === 'asc' ? 1 : -1;
    }
    console.log(req.body);
    
    const results = await findAllActivity(select || '', filter, sortOptions);
    return res.json({
      status: "success",
      msg: "Get all activities success",
      data: results,
    });
   
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyActivityHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyActivity({ activityId:{$in:req.body.id} });
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