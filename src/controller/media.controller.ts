import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateMediaInput, UpdateMediaInput } from "../schema/media.schema";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { createMedia, findMedia, findMediaByExpedition, deleteMedia, findAndUpdateMedia, deleteManyMedia } from "../service/media.service";

var colors = require("colors");

export async function createMediaHandler(req: Request<{}, {}, CreateMediaInput["body"]>, res: Response, next: NextFunction) {
  try {
    const image = req.file;
let url="";
  if(image){
    url = await uploadSingleFile(image);
  }
    console.log(url);
    const body = req.body;
    const category = await createMedia(body);

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: category,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getMediaHandler(req: Request<UpdateMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const mediaId = req.params.mediaId;
    const costExclude = await findMedia({ mediaId });

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

export async function getMediaByExpeditionHandler(req: Request<UpdateMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.mediaId;
    const results = await findMediaByExpedition({ expedition: expeditionId });

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

export async function deleteMediaHandler(req: Request<UpdateMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const mediaId = req.params.mediaId;
    const costExclude = await findMedia({ mediaId });

    if (!costExclude) {
      next(new AppError("costExclude does not exist", 404));
    }

    await deleteMedia({ mediaId });
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


export async function updateMediaHandler(req: Request<UpdateMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const image = req.file;

    const mediaId = req.params.mediaId;
    const media = await findMedia({ mediaId });

    if (!media) {
      next(new AppError("Media does not exist", 404));
      return;
    }

    let img1;
    if (image) {
      img1 = await uploadSingleFile(image);
    }

    const updatedMedia= await findAndUpdateMedia(
      {mediaId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedMedia,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyMediaHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyMedia({ mediaId:{$in:req.body.id} });
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