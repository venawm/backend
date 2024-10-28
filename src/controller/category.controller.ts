import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateCategoryInput, ReadCategoryFromCollectionInput, UpdateCategoryInput } from "../schema/category.schema";
import { createCategory, deleteCategory, findAllCategory, findAndUpdateCategory, findCategory, findManyCategory } from "../service/category.service";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import ExpeditionModel from "../models/expedition";
import CollectionModel from "../models/collection.model";
import { findCollection } from "../service/collection.service";

var colors = require("colors");

export async function createCategoryHandler(req: Request<{}, {}, CreateCategoryInput["body"]>, res: Response, next: NextFunction) {
  try {
    // const image = req.file;

    // const url = await uploadSingleFile(image);
    const body = req.body;
    const category = await createCategory({ ...body});

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: category,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function updateCategoryHandler(req: Request<UpdateCategoryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const image = req.file;

    const categoryId = req.params.categoryId;
    const category = await findCategory({ categoryId });

    if (!category) {
      next(new AppError("Category does not exist", 404));
      return;
    }

    let img1;
    if (image) {
      img1 = await uploadSingleFile(image);
    }

    const updatedCategory = await findAndUpdateCategory(
      { categoryId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCategory,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getCategoryHandler(req: Request<UpdateCategoryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const categoryId = req.params.categoryId;
    const category = await findCategory({$or:[{categoryId},{slug:categoryId}]  });

    if (!category) {
      next(new AppError("category does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: category,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function deleteCategoryHandler(req: Request<UpdateCategoryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const categoryId = req.params.categoryId;
    const category = await findCategory({ categoryId });

    if (!category) {
      next(new AppError("category does not exist", 404));
    }

    const [expeditionCount] = await Promise.all([
     
      ExpeditionModel.count({ category: category?._id })
    ]);
    if (expeditionCount<1) { 
      await deleteCategory({ categoryId });
      return res.json({
        status: "success",
        msg: "Delete success",
        data: {},
      });
    }
    else{
      next(new AppError("Cannot delete category as it contains other trips", 500));
    }
   
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllCategoryHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllCategory();
    return res.json({
      status: "success",
      msg: "Get all category success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}


export async function getCategoryFromCollectionHandler(req: Request<ReadCategoryFromCollectionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const collectionId = req.params.collectionId;
    const collection=await findCollection({slug:collectionId})
    if(!collection){
      next(new AppError("collection does not exist", 404));
    }
    const expedition = await findManyCategory({ collections:{$eq:collection?._id} });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: expedition,
    });
    
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}


export async function getCategoryFromCollectionByIdHandler(req: Request<ReadCategoryFromCollectionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const collectionId = req.params.collectionId;
   
  
    const expedition = await findManyCategory({ collections:{$eq:collectionId} });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: expedition,
    });
    
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}