import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { CreateTrainingInput, UpdateTrainingInput } from "../schema/training.schema";
import { createTraining, findTraining, findAndUpdateTraining, deleteTraining, findAllTraining, deleteManyTraining } from "../service/training.service";
var colors = require("colors");

export async function createTrainingHandler(req: Request<{}, {}, CreateTrainingInput["body"]>, res: Response, next: NextFunction) {
  try {
  


    const body = req.body;
    const training = await createTraining({ ...body, });
    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: training,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateTrainingHandler(req: Request<UpdateTrainingInput["params"]>, res: Response, next: NextFunction) {
  try {
   
 
    const trainingId = req.params.trainingId;
    const training = await findTraining({ trainingId });
    if (!training) {
      next(new AppError("training detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    

    const updatedTraining = await findAndUpdateTraining(
      { trainingId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedTraining,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getTrainingHandler(req: Request<UpdateTrainingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const trainingId = req.params.trainingId;
    const training = await findTraining({$or:[{trainingId},{slug:trainingId}]  });

    if (!training) {
      next(new AppError("training does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: training,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteTrainingHandler(req: Request<UpdateTrainingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const trainingId = req.params.trainingId;
    const training = await findTraining({ trainingId });

    if (!training) {
      next(new AppError("training does not exist", 404));
    }

    await deleteTraining({ trainingId });
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

export async function getAllTrainingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllTraining()
    return res.json({
      status: "success",
      msg: "Get all training success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyTrainingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyTraining({ trainingId:{$in:req.body.id} });
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