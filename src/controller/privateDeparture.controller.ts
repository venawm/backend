import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreatePrivateDepartureInput,UpdatePrivateDepartureInput } from "../schema/privateDeparture.schema";
import { createPrivateDeparture, deleteManyPrivateDeparture, deletePrivateDeparture, findAllPrivateDeparture, findAndUpdatePrivateDeparture, findPrivateDeparture, findPrivateDepartureByExpedition } from "../service/privateDeparture.service";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
var colors = require("colors");

export async function createPrivateDepartureHandler(req: Request<{}, {}, CreatePrivateDepartureInput["body"]>, res: Response, next: NextFunction) {
  try {
   
 
    const body = req.body;
    const privateDeparture = await createPrivateDeparture(body);

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: privateDeparture,
    });

  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updatePrivateDepartureHandler(req: Request<UpdatePrivateDepartureInput["params"]>, res: Response, next: NextFunction) {
  try {
    
    const privateDepartureId = req.params.privateDepartureId;
    const privateDeparture = await findPrivateDeparture({ privateDepartureId });

    if (!privateDeparture) {
      next(new AppError("Private Departure does not exist", 404));
      return;
    }

  

    const updatedPrivateDeparture = await findAndUpdatePrivateDeparture(
      { privateDepartureId },
      { ...req.body},
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedPrivateDeparture,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getPrivateDepartureHandler(req: Request<UpdatePrivateDepartureInput["params"]>, res: Response, next: NextFunction) {
  try {
    const privateDepartureId = req.params.privateDepartureId;
    const privateDeparture = await findPrivateDeparture({ privateDepartureId });

    if (!privateDeparture) {
      next(new AppError("Private Departure does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: privateDeparture,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deletePrivateDepartureHandler(req: Request<UpdatePrivateDepartureInput["params"]>, res: Response, next: NextFunction) {
  try {
    const privateDepartureId = req.params.privateDepartureId;
    const privateDeparture = await findPrivateDeparture({ privateDepartureId });

    if (!privateDeparture) {
      next(new AppError("Private Departure does not exist", 404));
    }

    await deletePrivateDeparture({ privateDepartureId });
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

export async function getAllPrivateDepartureHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllPrivateDeparture();
    return res.json({
      status: "success",
      msg: "Get all Private departures success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getPrivateDepartureByExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const results = await findPrivateDepartureByExpedition({ expedition: expeditionId });

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

export async function deleteManyPrivateDepartureHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyPrivateDeparture({ privateDepartureId:{$in:req.body.id} });
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