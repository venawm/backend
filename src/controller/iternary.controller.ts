import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateIternaryInput, UpdateIternaryInput } from "../schema/iternary.schema";
import { createIternary, deleteIternary, deleteManyIternary, findAllIternary, findAndUpdateIternary, findIternary, findIternaryByExpedition } from "../service/iternary.service";
var colors = require("colors");

export async function createIternaryHandler(req: Request<{}, {}, CreateIternaryInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const iternary = await createIternary(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: iternary,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateIternaryHandler(req: Request<UpdateIternaryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const iternaryId = req.params.iternaryId;
    const iternary = await findIternary({ iternaryId });
    if (!iternary) {
      next(new AppError("iternary detail does not exist", 404));
      return;
    }

    const updatedIternary = await findAndUpdateIternary(
      { iternaryId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedIternary,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getIternaryHandler(req: Request<UpdateIternaryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const iternaryId = req.params.iternaryId;
    const iternary = await findIternary({ iternaryId });

    if (!iternary) {
      next(new AppError("iternary does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: iternary,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getIternaryByExpeditionHandler(req: Request<UpdateIternaryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.iternaryId;
    const iternarnaries = await findIternaryByExpedition({ expedition: expeditionId });
    console.log(iternarnaries);

    return res.json({
      status: "success",
      msg: "Get success",
      data: iternarnaries,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getIternaryByActivityHandler(req: Request<UpdateIternaryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const activityId = req.params.iternaryId;
    const iternarnaries = await findAllIternary({ activity: activityId });

    return res.json({
      status: "success",
      msg: "Get success",
      data: iternarnaries,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteIternaryHandler(req: Request<UpdateIternaryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const iternaryId = req.params.iternaryId;
    const iternary = await findIternary({ iternaryId });

    if (!iternary) {
      next(new AppError("iternary does not exist", 404));
    }

    await deleteIternary({ iternaryId });
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

export async function getAllIternaryHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const filter = req.query;
    console.log(filter);

    const results = await findAllIternary(filter);
    return res.json({
      status: "success",
      msg: "Get all iternary success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyIternaryHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyIternary({ iternaryId:{$in:req.body.id} });
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