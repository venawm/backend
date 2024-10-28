import { NextFunction, Request, Response } from "express";
import { CreateInquiryInput, UpdateInquiryInput } from "../schema/inquiry.schema";
import { createInquiry, deleteInquiry, deleteManyInquiry, findAllInquiry, findAndUpdateInquiry, findInquiry } from "../service/inquery.service";
import AppError from "../utils/appError";

var colors = require("colors");

export async function createInquiryHandler(req: Request<{}, {}, CreateInquiryInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const inquery = await createInquiry(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: inquery,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateInquiryHandler(req: Request<UpdateInquiryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const inquiryId = req.params.inquiryId;
    const inquiry = await findInquiry({ inquiryId });
    if (!inquiry) {
      next(new AppError("Inquiry detail does not exist", 404));
      return;
    }

    const updatedInquiry = await findAndUpdateInquiry(
      { inquiryId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedInquiry,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getInquiryHandler(req: Request<UpdateInquiryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const inquiryId = req.params.inquiryId;
    const inquiry = await findInquiry({ inquiryId });

    if (!inquiry) {
      next(new AppError("Inquiry does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: inquiry,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteInquiryHandler(req: Request<UpdateInquiryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const inquiryId = req.params.inquiryId;
    const inquiry = await findInquiry({ inquiryId });

    if (!inquiry) {
      next(new AppError("Inquiry does not exist", 404));
    }

    await deleteInquiry({ inquiryId });
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

export async function getAllInquiryHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllInquiry();
    return res.json({
      status: "success",
      msg: "Get all inquery success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyInquiryHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyInquiry({ inquiryId:{$in:req.body.id} });
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