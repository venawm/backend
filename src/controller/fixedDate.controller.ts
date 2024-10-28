import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { createFixedDate, deleteFixedDate, deleteManyFixedDate, findAllFixedDate, findAllFixedDateByExpedition, findAndUpdateFixedDate, findFixedDate } from "../service/fixedDate.service";
import { CreateFixedDateInput, UpdateFixedDateInput } from "../schema/fixedDate.schema";

var colors = require("colors");

export async function createFixedDateHandler(req: Request<{}, {}, CreateFixedDateInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const result = await createFixedDate(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: result,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateFixedDateHandler(req: Request<UpdateFixedDateInput["params"]>, res: Response, next: NextFunction) {
  try {
    const fixedDateId = req.params.fixedDateId;
    const fixedDate = await findFixedDate({ fixedDateId });
    if (!fixedDate) {
      next(new AppError("fixedDate detail does not exist", 404));
      return;
    }

    const updatedFixedDate = await findAndUpdateFixedDate({ fixedDateId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedFixedDate,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getFixedDateHandler(req: Request<UpdateFixedDateInput["params"]>, res: Response, next: NextFunction) {
  try {
    const fixedDateId = req.params.fixedDateId;
    const fixedDate = await findFixedDate({ fixedDateId });

    if (!fixedDate) {
      next(new AppError("fixedDate does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: fixedDate,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteFixedDateHandler(req: Request<UpdateFixedDateInput["params"]>, res: Response, next: NextFunction) {
  try {
    const fixedDateId = req.params.fixedDateId;
    const fixedDate = await findFixedDate({ fixedDateId });

    if (!fixedDate) {
      next(new AppError("fixedDate does not exist", 404));
    }

    await deleteFixedDate({ fixedDateId });
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

export async function getAllFixedDateHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllFixedDate();
    return res.json({
      status: "success",
      msg: "Get all fixed dates success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getFixedDateByExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const results = await findAllFixedDateByExpedition({ expedition: expeditionId });

    return res.json({
      status: "success",
      msg: "Get success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyFixedDateHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyFixedDate({ fixedDateId:{$in:req.body.id} });
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