import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { CreateBlogInput, UpdateBlogInput } from "../schema/blog.schema";
import { createBlog, findBlog, findAndUpdateBlog, deleteBlog, findAllBlog, findAllBlogForCard, deleteManyBlog } from "../service/blog.service";
var colors = require("colors");

export async function createBlogHandler(req: Request<{}, {}, CreateBlogInput["body"]>, res: Response, next: NextFunction) {
  try {
    // const { files } = req as { files: { [fieldname: string]: Express.Multer.File[] } };
    // const banner = files["banner"][0];
    // const authorImage = files["authorImage"][0];

    // const front = await uploadSingleFile(banner);
    // const back = await uploadSingleFile(authorImage);

    const body = req.body;
    console.log(body);
    // const expedition = await createBlog({ ...body, banner: front, authorImage: back });
    const blog = await createBlog(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: blog,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateBlogHandler(req: Request<UpdateBlogInput["params"]>, res: Response, next: NextFunction) {
  try {
    const blogId = req.params.blogId;
    const blog = await findBlog({ blogId });

    if (!blog) {
      next(new AppError("Blog does not exist", 404));
      return; 
    }

    const updatedBlog = await findAndUpdateBlog({ blogId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedBlog,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getBlogHandler(req: Request<UpdateBlogInput["params"]>, res: Response, next: NextFunction) {
  try {
    const blogId = req.params.blogId;
    console.log(blogId);
    const expedition = await findBlog({ blogId });

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

export async function deleteBlogHandler(req: Request<UpdateBlogInput["params"]>, res: Response, next: NextFunction) {
  try {
    const blogId = req.params.blogId;
    const expedition = await findBlog({ blogId });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    await deleteBlog({ blogId });
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

export async function getAllBlogHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const filter = req.query;
    const results = await findAllBlog(filter);
    return res.json({
      status: "success",
      msg: "Get all success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllBlogHandlerForCard(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllBlogForCard();
    return res.json({
      status: "success",
      msg: "Get all success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyBlogHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyBlog({ blogId:{$in:req.body.id} });
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