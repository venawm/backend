import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import {
  createReview,
  deleteReview,
  findReview,
  findAllReview,
  findAndUpdateReview,
  findReviewByExpedition,
  deleteManyReview,
} from "../service/review.service";
import { CreateReviewInput, UpdateReviewInput } from "../schema/review.schema";

const colors = require("colors");

export async function createReviewHandler(
  req: Request<{}, {}, CreateReviewInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const item: any = await createReview({ ...body });
    console.log(body);
    console.log(item);
    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: item,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    return next(new AppError("Internal server error", 500));
  }
}

export async function updateReviewHandler(
  req: Request<UpdateReviewInput["params"], {}, UpdateReviewInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const ReviewId = req.params.ReviewId;
    const item = await findReview({ reviewId: ReviewId });

    if (!item) {
      return next(new AppError("item does not exist", 404));
    }
    const updatedItem = await findAndUpdateReview(
      { reviewId: ReviewId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedItem,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return next(new AppError("Internal server error", 500));
  }
}

export async function getReviewHandler(
  req: Request<UpdateReviewInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const ReviewId = req.params.ReviewId;
    const item = await findReview({ reviewId: ReviewId });

    if (!item) {
      return next(new AppError("item does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: item,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    return next(new AppError("Internal server error", 500));
  }
}

export async function deleteReviewHandler(
  req: Request<UpdateReviewInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const ReviewId = req.params.ReviewId;
    const item = await findReview({ reviewId: ReviewId });

    if (!item) {
      return next(new AppError("item does not exist", 404));
    }

    await deleteReview({ reviewId: ReviewId });
    return res.json({
      status: "success",
      msg: "Delete success",
      data: {},
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    return next(new AppError("Internal server error", 500));
  }
}

export async function getAllReviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const results = await findAllReview();
    return res.json({
      status: "success",
      msg: "Get all item success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    return next(new AppError("Internal server error", 500));
  }
}

export async function getReviewByExpeditionHandler(
  req: Request<{ expeditionId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const expeditionId = req.params.expeditionId;
    const results = await findReviewByExpedition({ expedition: expeditionId });

    return res.json({
      status: "success",
      msg: "Get success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    return next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyReviewHandler(
  req: Request<{}, {}, { id: string[] }>,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body.id && req.body.id.length > 0) {
      await deleteManyReview({ reviewId: { $in: req.body.id } });
      return res.json({
        status: "success",
        msg: "Delete success",
        data: {},
      });
    } else {
      return res.status(400).json({
        status: "error",
        msg: "Delete error: No IDs provided",
        data: {},
      });
    }
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    return next(new AppError("Internal server error", 500));
  }
}
