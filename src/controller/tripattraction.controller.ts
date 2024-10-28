import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateTripAttractionInput, UpdateTripAttractionInput } from "../schema/tripattraction.schema";
import { createTripAttraction, findTripAttraction, findAndUpdateTripAttraction, deleteTripAttraction, findAllTripAttraction, findTripAttractionByExpedition, deleteManyTripAttraction } from "../service/tripattraction.service";

var colors = require("colors");

export async function createTripAttractionHandler(req: Request<{}, {}, CreateTripAttractionInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const tripAttraction = await createTripAttraction(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: tripAttraction,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateTripAttractionHandler(req: Request<UpdateTripAttractionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const tripAttractionId = req.params.tripAttractionId;
    const tripAttraction = await findTripAttraction({ tripAttractionId });
    if (!tripAttraction) {
      next(new AppError("tripAttraction detail does not exist", 404));
      return;
    }

    const updatedTripAttraction = await findAndUpdateTripAttraction({ tripAttractionId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedTripAttraction,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getTripAttractionHandler(req: Request<UpdateTripAttractionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const tripAttractionId = req.params.tripAttractionId;
    const tripAttraction = await findTripAttraction({ tripAttractionId });

    if (!tripAttraction) {
      next(new AppError("tripAttraction does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: tripAttraction,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getTripAttractionByExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const results = await findTripAttractionByExpedition({ expedition: expeditionId });

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

export async function deleteTripAttractionHandler(req: Request<UpdateTripAttractionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const tripAttractionId = req.params.tripAttractionId;
    const tripAttraction = await findTripAttraction({ tripAttractionId });

    if (!tripAttraction) {
      next(new AppError("tripAttraction does not exist", 404));
    }

    await deleteTripAttraction({ tripAttractionId });
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

export async function getAllTripAttractionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const filter = req.query;
    const results = await findAllTripAttraction(filter);
    return res.json({
      status: "success",
      msg: "Get all trip attraction success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}


export async function deleteManyTripAttractionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
    if (req.body.id) {
      await deleteManyTripAttraction({ tripAttractionId: { $in: req.body.id } });
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