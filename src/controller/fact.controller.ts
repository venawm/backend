import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateFactInput, UpdateFactInput } from "../schema/fact.schema";
import { createFact, findFact, findAndUpdateFact, deleteFact, findAllFact, findFactByExpedition, deleteManyFact } from "../service/fact.service";

var colors = require("colors");

export async function createFactHandler(req: Request<{}, {}, CreateFactInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const fact = await createFact(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: fact,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateFactHandler(req: Request<UpdateFactInput["params"]>, res: Response, next: NextFunction) {
  try {
    const factId = req.params.factId;
    const fact = await findFact({ factId });
    if (!fact) {
      next(new AppError("fact detail does not exist", 404));
      return;
    }

    const updatedFact = await findAndUpdateFact({ factId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedFact,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getFactHandler(req: Request<UpdateFactInput["params"]>, res: Response, next: NextFunction) {
  try {
    const factId = req.params.factId;
    const fact = await findFact({ factId });

    if (!fact) {
      next(new AppError("fact does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: fact,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getFactByExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const results = await findFactByExpedition({ expedition: expeditionId });

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

export async function deleteFactHandler(req: Request<UpdateFactInput["params"]>, res: Response, next: NextFunction) {
  try {
    const factId = req.params.factId;
    const fact = await findFact({ factId });

    if (!fact) {
      next(new AppError("fact does not exist", 404));
    }

    await deleteFact({ factId });
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

export async function getAllFactHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllFact();
    return res.json({
      status: "success",
      msg: "Get all fact success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyFactHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyFact({ factId:{$in:req.body.id} });
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