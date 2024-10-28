import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateValueAdditionInput, UpdateValueAdditionInput } from "../schema/valueAddition.schema";
import { createValueAddition, findValueAddition, findAndUpdateValueAddition, deleteValueAddition, findAllValueAddition, findValueAdditionByExpedition, deleteManyValueAddition } from "../service/valueAddition.service";

var colors = require("colors");

export async function createValueAdditionHandler(req: Request<{}, {}, CreateValueAdditionInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const valueAddition = await createValueAddition(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: valueAddition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function updateValueAdditionHandler(req: Request<UpdateValueAdditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const valueAdditionId = req.params.valueAdditionId;
    const valueAddition = await findValueAddition({ valueAdditionId });
    if (!valueAddition) {
      next(new AppError("value addition detail does not exist", 404));
      return;
    }

    const updatedValueAddition = await findAndUpdateValueAddition({ valueAdditionId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedValueAddition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getValueAdditionHandler(req: Request<UpdateValueAdditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const valueAdditionId = req.params.valueAdditionId;
    const valueAddition = await findValueAddition({ valueAdditionId });

    if (!valueAddition) {
      next(new AppError("Value addition does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: valueAddition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getValueAdditionByExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const results = await findValueAdditionByExpedition({ expedition: expeditionId });

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

export async function deleteValueAdditionHandler(req: Request<UpdateValueAdditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const valueAdditionId = req.params.valueAdditionId;
    const valueAddition = await findValueAddition({ valueAdditionId });

    if (!valueAddition) {
      next(new AppError("valueAddition does not exist", 404));
    }

    await deleteValueAddition({ valueAdditionId });
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

export async function getAllValueAdditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllValueAddition();
    return res.json({
      status: "success",
      msg: "Get all value addition success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyValueAdditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
    if (req.body.id) {
      await deleteManyValueAddition({ valueAdditionId: { $in: req.body.id } });
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