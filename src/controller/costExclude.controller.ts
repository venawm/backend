import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateCostExcludeInput, UpdateCostExcludeInput } from "../schema/costExclude";
import { createCostExclude, findCostExclude, findAndUpdateCostExclude, deleteCostExclude, findAllCostExclude, findCostExcludeByExpedition, deleteManyCostExclude } from "../service/costExclude.service";

var colors = require("colors");

export async function createCostExcludeHandler(req: Request<{}, {}, CreateCostExcludeInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const costExclude = await createCostExclude(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: costExclude,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateCostExcludeHandler(req: Request<UpdateCostExcludeInput["params"]>, res: Response, next: NextFunction) {
  try {
    const costExcludeId = req.params.costExcludeId;
    const costExclude = await findCostExclude({ costExcludeId });
    if (!costExclude) {
      next(new AppError("costExclude detail does not exist", 404));
      return;
    }

    const updatedCostExclude = await findAndUpdateCostExclude({ costExcludeId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCostExclude,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function getCostExcludeHandler(req: Request<UpdateCostExcludeInput["params"]>, res: Response, next: NextFunction) {
  try {
    const costExcludeId = req.params.costExcludeId;
    const costExclude = await findCostExclude({ costExcludeId });

    if (!costExclude) {
      next(new AppError("costExclude does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: costExclude,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getCostExcludeByExpeditionHandler(req: Request<UpdateCostExcludeInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.costExcludeId;
    const results = await findCostExcludeByExpedition({ expedition: expeditionId });

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

export async function deleteCostExcludeHandler(req: Request<UpdateCostExcludeInput["params"]>, res: Response, next: NextFunction) {
  try {
    const costExcludeId = req.params.costExcludeId;
    const costExclude = await findCostExclude({ costExcludeId });

    if (!costExclude) {
      next(new AppError("costExclude does not exist", 404));
    }

    await deleteCostExclude({ costExcludeId });
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

export async function getAllCostExcludeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllCostExclude();
    return res.json({
      status: "success",
      msg: "Get all cost Exclude success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyCostExcludeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyCostExclude({ costExcludeId:{$in:req.body.id} });
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