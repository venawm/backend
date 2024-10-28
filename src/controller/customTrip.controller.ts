import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateBookingInput, UpdateBookingInput } from "../schema/booking.schema";
import { createBooking, deleteBooking, findAllBooking, findAndUpdateBooking, findBooking } from "../service/booking.service";
import { createUser, findUser } from "../service/user.service";
import { generateHashedPassword } from "../utils/generateHashedPassword";
import crypto from "crypto";
import { UpdateCustomTripInput } from "../schema/customTrip.schema";
import { createCustomTrip, deleteCustomTrip, deleteManyCustomTrip, findAllCustomTrip, findAndUpdateCustomTrip, findCustomTrip } from "../service/customTrip.service";

var colors = require("colors");

// export async function createBookingHandler(req: Request<{}, {}, CreateBookingInput["body"]>, res: Response, next: NextFunction) {
export async function createCustomTripHandler(req: Request<{}, {}, any>, res: Response, next: NextFunction) {
  try {
    // Before creating booking register the user
    // const userExistWithEmail = await findUser({ email: req.body.email });
    // if (userExistWithEmail) {
    //   return next(new AppError("User with this email already exists", 409));
    // }

    // const hashedPassword = await generateHashedPassword(req.body.password);
    // const token = crypto.randomBytes(20).toString("hex");
    // const registeredUser = await createUser({ ...req.body, password: hashedPassword, verifyToken: token, isVerified: false });
    // console.log("registeredUser", registeredUser);
    const body = req.body;
    const customTrip = await createCustomTrip({...body});
    console.log(customTrip)
    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: customTrip,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateCustomTripHandler(req: Request<UpdateCustomTripInput["params"]>, res: Response, next: NextFunction) {
  try {
    const customTripId= req.params.customTripId;
    const customTrip = await findCustomTrip({ customTripId });

    if (!customTrip) {
      next(new AppError("custom trip does not exist", 404));
      return;
    }

    const updatedCustomTrip = await findAndUpdateCustomTrip(
      { customTripId },
      { ...req.body},
      {
        new: true,
      }
    );

    return res.status(201).json({
      status: "success",
      msg: "Update success",
      data: updatedCustomTrip,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getCustomTripHandler(req: Request<UpdateCustomTripInput["params"]>, res: Response, next: NextFunction) {
  try {
    const customTripId = req.params.customTripId;
    const customTrip = await findCustomTrip({ customTripId });

    if (!customTrip) {
      next(new AppError("custom trip does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: customTrip,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteCustomTripHandler(req: Request<UpdateCustomTripInput["params"]>, res: Response, next: NextFunction) {
  try {
    const customTripId = req.params.customTripId;
    const customTrip = await findCustomTrip({ customTripId });

    if (!customTrip) {
      next(new AppError("custom trip does not exist", 404));
    }

    await deleteCustomTrip({ customTripId });
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



export async function getAllCustomTripHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const filter = req.query; 
    const results = await findAllCustomTrip(filter);
    
    return res.json({
      status: "success",
      msg: "Get all custom trip success",
      data: results,
    });

  } catch (error: any) {

    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  
  }
}

export async function deleteManyCustomTripHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyCustomTrip({ customTripId:{$in:req.body.id} });
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