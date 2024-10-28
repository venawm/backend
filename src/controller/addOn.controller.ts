import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateAddOnInput, UpdateAddOnInput } from "../schema/addOn.schema";
import { createAddOn, findAddOn, findAndUpdateAddOn, deleteAddOn, findAllAddOn, deleteManyAddOn } from "../service/addOn.service";
var colors = require("colors");

export async function createAddOnHandler(req: Request<{}, {}, CreateAddOnInput["body"]>, res: Response, next: NextFunction) {
  try {
 
    const body = req.body;
    console.log(body);
    const addOn = await createAddOn({ ...body});

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: addOn,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateAddOnHandler(req: Request<UpdateAddOnInput["params"]>, res: Response, next: NextFunction) {
  try {
 

    const addOnId = req.params.addOnId;
    const addOn = await findAddOn({ addOnId });

    if (!addOn) {
      next(new AppError("Add on field does not exist", 404));
      return;
    }

   
    const updatedAddOn = await findAndUpdateAddOn(
      { addOnId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedAddOn,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getAddOnHandler(req: Request<UpdateAddOnInput["params"]>, res: Response, next: NextFunction) {
  try {
    const addOnId = req.params.addOnId;
    const addOn = await findAddOn({ addOnId });

    if (!addOn) {
      next(new AppError("add on does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: addOn,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteAddOnHandler(req: Request<UpdateAddOnInput["params"]>, res: Response, next: NextFunction) {
  try {
    const addOnId = req.params.addOnId;
    const addOn = await findAddOn({ addOnId });

    if (!addOn) {
      next(new AppError("add on does not exist", 404));
    }

    await deleteAddOn({ addOnId });
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

export async function getAllAddOnHandler(req: Request, res: Response, next: NextFunction) {
  try {


    const { filter, sortBy, order, select } = req.body;
    const sortOptions: any = {};
    if (sortBy && order) {
      sortOptions[sortBy] = order === 'asc' ? 1 : -1;
    }
    console.log(req.body);
    
    const results = await findAllAddOn(select || '', filter, sortOptions);
    return res.json({
      status: "success",
      msg: "Get all add ons success",
      data: results,
    });
   
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyAddOnHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyAddOn({ addOnId:{$in:req.body.id} });
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