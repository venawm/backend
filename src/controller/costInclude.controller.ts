import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import {
  createCostInclude,
  deleteCostInclude,
  deleteManyCostInclude,
  findAllCostInclude,
  findAndUpdateCostInclude,
  findCostInclude,
  findCostIncludeByExpedition,
} from "../service/costInclude.service";
import {
  CreateCostIncludeInput,
  UpdateCostIncludeInput,
} from "../schema/costInclude.schema";
var colors = require("colors");

export async function createCostIncludeHandler(
  req: Request<{}, {}, CreateCostIncludeInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const costInclude = await createCostInclude(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: costInclude,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateCostIncludeHandler(
  req: Request<UpdateCostIncludeInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const costIncludeId = req.params.costIncludeId;
    const costInclude = await findCostInclude({ costIncludeId });
    if (!costInclude) {
      next(new AppError("costInclude detail does not exist", 404));
      return;
    }

    const updatedCostInclude = await findAndUpdateCostInclude(
      { costIncludeId },
      req.body,
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCostInclude,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getCostIncludeHandler(
  req: Request<UpdateCostIncludeInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const costIncludeId = req.params.costIncludeId;
    const costInclude = await findCostInclude({ costIncludeId });

    if (!costInclude) {
      next(new AppError("costInclude does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: costInclude,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getCostIncludeByExpeditionHandler(
  req: Request<{ expeditionId?: string; activityId?: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { expeditionId, activityId } = req.params;

    // Determine if the request is by expeditionId or activityId
    const results = expeditionId
      ? await findCostIncludeByExpedition({ expedition: expeditionId })
      : activityId
      ? await findCostIncludeByExpedition({ activity: activityId })
      : null;

    if (!results) {
      return res.status(404).json({
        status: "fail",
        msg: "No data found",
      });
    }

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

export async function deleteCostIncludeHandler(
  req: Request<UpdateCostIncludeInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const costIncludeId = req.params.costIncludeId;
    const costInclude = await findCostInclude({ costIncludeId });

    if (!costInclude) {
      next(new AppError("costInclude does not exist", 404));
    }

    await deleteCostInclude({ costIncludeId });
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

export async function getAllCostIncludeHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filter = req.query;

    const results = await findAllCostInclude(filter);
    return res.json({
      status: "success",
      msg: "Get all cost include success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyCostIncludeHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("hii");
    if (req.body.id) {
      await deleteManyCostInclude({ costIncludeId: { $in: req.body.id } });
      return res.json({
        status: "success",
        msg: "Delete success",
        data: {},
      });
    } else {
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
