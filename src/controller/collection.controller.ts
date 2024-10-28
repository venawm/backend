import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import {
  CreateCollectionInput,
  UpdateCollectionInput,
} from "../schema/collection.schema";
import {
  createCollection,
  deleteCollection,
  findAllCollection,
  findAndUpdateCollection,
  findCollection,
} from "../service/collection.service";
import { findAllCategory } from "../service/category.service";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { getCategoryFromCollectionHandler } from "./category.controller";
import { findManyCategory } from "../service/category.service";
import CategoryModel from "../models/category.model";
import ExpeditionModel from "../models/expedition";
var colors = require("colors");

export async function createCollectionHandler(
  req: Request<{}, {}, CreateCollectionInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    const image = req.file;

    let img1;
    if (image) {
      img1 = await uploadSingleFile(image);
    }

    const body = req.body;
    const collection = await createCollection({ ...body });

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: collection,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function updateCollectionHandler(
  req: Request<UpdateCollectionInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const image = req.file;

    const collectionId = req.params.collectionId;
    const collection = await findCollection({ collectionId });

    if (!collection) {
      next(new AppError("Collection does not exist", 404));
      return;
    }

    let img1;
    if (image) {
      img1 = await uploadSingleFile(image);
    }

    console.log(req.body);
    const updatedCollection = await findAndUpdateCollection(
      { collectionId },
      { ...req.body },
      {
        new: true,
      }
    );

    console.log(updatedCollection);
    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCollection,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError(error.message, 500));
  }
}

export async function getCollectionHandler(
  req: Request<UpdateCollectionInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const collectionId = req.params.collectionId;
    const collection = await findCollection({
      $or: [{ collectionId }, { slug: collectionId }],
    });

    if (!collection) {
      next(new AppError("Collection does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: collection,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteCollectionHandler(
  req: Request<UpdateCollectionInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const collectionId = req.params.collectionId;
    const collection = await findCollection({ collectionId });

    if (!collection) {
      next(new AppError("collection does not exist", 404));
    }

    const [categoryCount, expeditionCount] = await Promise.all([
      CategoryModel.count({ collections: collection?._id }),
      ExpeditionModel.count({ collections: collection?._id }),
    ]);
    if (categoryCount < 1 && expeditionCount < 1) {
      await deleteCollection({ collectionId });
      return res.json({
        status: "success",
        msg: "Delete success",
        data: {},
      });
    } else {
      next(
        new AppError(
          "Cannot delete collection as it contains other categories or trips",
          500
        )
      );
    }
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllCollectionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { filter, sortBy, order, select } = req.body;
    const sortOptions: any = {};
    if (sortBy && order) {
      sortOptions[sortBy] = order === "asc" ? 1 : -1;
    }
    console.log(req.body);

    const results = await findAllCollection(
      select || "",
      {},
      filter,
      sortOptions
    );
    return res.json({
      status: "success",
      msg: "Get all collections success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
