import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateActivityBookingInput, UpdateActivityBookingInput } from "../schema/activityBooking.schema";

import { createActivityBooking, deleteActivityBooking, findActivityBooking, findAllActivityBooking, findAndUpdateActivityBooking } from "../service/activityBooking.service";
var colors = require("colors");

// export async function createBookingHandler(req: Request<{}, {}, CreateBookingInput["body"]>, res: Response, next: NextFunction) {
export async function createBookingHandler(req: Request<{}, {}, CreateActivityBookingInput["body"]>, res: Response, next: NextFunction) {
  try {
   

    const body = req.body;
   
    const booking = await createActivityBooking({ ...body});
    console.log(booking);
    return res.status(201).json({
      status: "success",
      msg: "Booking success",
      data: booking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateBookingHandler(req: Request<UpdateActivityBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.activityBookingId;
    const booking = await findActivityBooking({activityBookingId: bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
      return;
    }

    const updatedCostBooking = await findAndUpdateActivityBooking(
      { activityBookingId:bookingId },
      { ...req.body, isSeen: true },
      {
        new: true,
      }
    );

    return res.status(201).json({
      status: "success",
      msg: "Update success",
      data: updatedCostBooking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getBookingHandler(req: Request<UpdateActivityBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.activityBookingId;
    const booking = await findActivityBooking({ activityBookingId:bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: booking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteBookingHandler(req: Request<UpdateActivityBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.activityBookingId;
    const booking = await findActivityBooking({activityBookingId: bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
    }

    await deleteActivityBooking({ activityBookingId:bookingId });
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

export async function cancelBookingHandler(req: Request<UpdateActivityBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.activityBookingId;
    const booking = await findActivityBooking({activityBookingId: bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
      return;
    }

    const updatedCostBooking = await findAndUpdateActivityBooking(
      { activityBookingId:bookingId },
      { ...req.body, status: "canceled" },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCostBooking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllBookingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const filter = req.query;

    const results = await findAllActivityBooking(filter);
    return res.json({
      status: "success",
      msg: "Get all booking success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}



