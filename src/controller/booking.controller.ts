import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateBookingInput, UpdateBookingInput } from "../schema/booking.schema";
import { createBooking, deleteBooking, deleteManyBooking, findAllBooking, findAndUpdateBooking, findBooking } from "../service/booking.service";
import { createUser, findUser } from "../service/user.service";
import { generateHashedPassword } from "../utils/generateHashedPassword";
import crypto from "crypto";
import nodemailer from "nodemailer";
import schedule, { scheduleJob } from "node-schedule";
import BookingModel from "../models/booking.model";
import { findAndUpdateGroupDeparture } from "../service/groupDeparture.service";
import GroupDepartureModel from "../models/groupDeparture.model";

var colors = require("colors");

// export async function createBookingHandler(req: Request<{}, {}, CreateBookingInput["body"]>, res: Response, next: NextFunction) {
export async function createBookingHandler(req: Request<{}, {}, any>, res: Response, next: NextFunction) {
  try {
    // const userExistWithEmail = await findUser({ email: req.body.email });

    // let registeredUser = null;
    // if (!userExistWithEmail) {
    //   const hashedPassword = await generateHashedPassword(req.body.password);
    //   const token = crypto.randomBytes(20).toString("hex");
    //   registeredUser = await createUser({ ...req.body, password: hashedPassword, verifyToken: token, isVerified: false });
    // }

    // Find the group departure details
    // const groupDeparture = await GroupDepartureModel.findO(req.body.departureId);
    // if (!groupDeparture) {
    //   return res.status(404).json({
    //     status: "failure",
    //     msg: "Group departure not found",
    //   });
    // }

    // // Check if there are enough seats available
    // const availableSeats = groupDeparture.totalQuantity - groupDeparture.soldQuantity;
    // if (availableSeats < req.body.travellers.length) {
    //   return res.status(400).json({
    //     status: "failure",
    //     msg: `Only ${availableSeats} seats remaining, cannot book ${req.body.travellers.length} seats.`,
    //   });
    // }

    const body = req.body;
    console.log("🚀 ~ createBookingHandler ~ body:", body.departure)

    // Find the group departure details
    const groupDeparture = await GroupDepartureModel.findOne({ _id: body.departure });
    console.log("🚀 ~ createBookingHandler ~ groupDeparture:", groupDeparture)
    if (!groupDeparture) {
      return res.status(404).json({
        status: "failure",
        msg: "Group departure not found",
      });
    }
    // Check if there are enough seats available
    const availableSeats: number = groupDeparture.totalQuantity - groupDeparture.soldQuantity;
    if (availableSeats < body.travellers.length || availableSeats < 1 ) {
      return res.status(400).json({
        status: "failure",
        msg: `Only ${availableSeats} seats remaining, cannot book ${body.travellers.length} seats.`,
      });
    }

    //  create booking
    const booking = await createBooking({ ...body, paymentStatus: "pending", paymentMethod: "card" });

    // increment sold quantity in group departure
    const updatedGroupDeparture = await GroupDepartureModel.findOneAndUpdate({ _id: body.departure }, { $inc: { soldQuantity: body.travellers.length } }, { new: true });
    console.log("🚀 ~ createBookingHandler ~ updatedGroupDeparture:", updatedGroupDeparture)



    // const updatedGroupDeparture = await findAndUpdateGroupDeparture(
    //   { groupDepartureId: groupDeparture._id },
    //   { $inc: { soldQuantity: body.travellers.length } },
    //   {
    //     new: true,
    //   }
    // );





    // const booking = await createBooking({ ...body, paymentStatus: "pending", paymentMethod: "card", user: registeredUser?._id });

    console.log(booking);
    return res.status(201).json({
      status: "success",
      msg: "Booking success",
      data: booking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function updateBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
      return;
    }

    const updatedCostBooking = await findAndUpdateBooking(
      { bookingId },
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

export async function getBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

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
    next(new AppError(error.message, 500));
  }
}

export async function deleteBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
    }

    await deleteBooking({ bookingId });
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

export async function cancelBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
      return;
    }

    const updatedCostBooking = await findAndUpdateBooking(
      { bookingId },
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

    const results = await findAllBooking(filter);
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

export async function sendInvoiceHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const { pdf } = req.body;
    const booking = await findBooking({ bookingId });
    console.log(booking);
    if (!pdf) {
      return res.status(400).send("PDF data is required.");
    }

    // Decode the PDF data
    const pdfBuffer = Buffer.from(pdf, "base64");

    if (booking && !booking.invoiceSent && booking?.user?.email) {
      console.log(req.body);

      let attachments = [
        {
          filename: `contour_booking_invoice.pdf`,
          content: pdfBuffer,
          encoding: "base64",
        },
      ];

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: parseInt(process.env.SMTP_PORT as string, 10), // Ensure port is an integer
        secure: process.env.SMTP_SECURE === "true", // Convert secure to boolean
        auth: {
          user: process.env.SMTP_USER as string,
          pass: process.env.SMTP_PASSWORD as string,
        },
      });

      const info = await transporter.sendMail({
        from: "Contour Expeditions",
        to: booking?.user?.email,
        subject: "invoice",
        html: "Here is the attached invoice. Thank you for booking a trip with us.",
        attachments: attachments || [],
      });

      console.log(attachments);
      console.log(info);
      const updatedCostBooking = await findAndUpdateBooking(
        { bookingId },
        { invoiceSent: true },
        {
          new: true,
        }
      );

      return res.status(200).json({
        status: "success",
        msg: "Invoice sent ",
      });
    } else {
      return res.status(400).json({
        status: "failure",
        msg: "Some problem occurred. ",
      });
    }
  } catch (error: any) {
    console.error(colors.red(error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getUserBookingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.userId;
    const booking = await findAllBooking({ user: { $eq: userId } });

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

const job = scheduleJob("1 2 * * *", async function () {
  const now = new Date();
  const reminderDate = new Date();
  reminderDate.setDate(now.getDate() + 7);
  console.log(reminderDate);
  const advancedBookings = await BookingModel.find({
    $and: [
      {
        paymentOption: "deposit-payment",
        startDate: { $gte: now, $lte: reminderDate },
      },
    ],
  }).populate("expedition");
  console.log(advancedBookings);
  if (advancedBookings && advancedBookings?.length > 0) {
    advancedBookings.forEach(async (i: any) => {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: parseInt(process.env.SMTP_PORT as string, 10), // Ensure port is an integer
        secure: process.env.SMTP_SECURE === "true", // Convert secure to boolean
        auth: {
          user: process.env.SMTP_USER as string,
          pass: process.env.SMTP_PASSWORD as string,
        },
      });

      const info = await transporter.sendMail({
        from: "Contour Expedition",
        to: i?.email,
        subject: "Regarding due payment",
        html: `<div>
    <div class="container">
     <div class="content">
         <p class="heading">Hello, this is a gentle reminder that your departure for the trip ${i?.expedition?.name} is approaching. While the payments have not been cleared yet, we request you to clear
         all payments to avoid any hassle.</p>
         
     </div>
     <div class="footer">
         <p>Thanks and Regards, Contour Expedition .</p>
         <p>For any queries contact us here:</p>
        <p>
       
        </p>
         <p>Phone: +977 9761725425</p>     
 </div>
 </div>
   </div>`,
      });
      console.log(info);
    });
  }
});
const job2 = scheduleJob("1 2 * * *", async function () {
  const now = new Date();

  const overdueBookings = await BookingModel.find({
    $and: [
      {
        remainingAmount: { $gte: 0 },
        startDate: { $lte: now },
      },
    ],
  }).populate("expedition");
  console.log(overdueBookings);
  if (overdueBookings && overdueBookings?.length > 0) {
    overdueBookings.forEach(async (i: any) => {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: parseInt(process.env.SMTP_PORT as string, 10), // Ensure port is an integer
        secure: process.env.SMTP_SECURE === "true", // Convert secure to boolean
        auth: {
          user: process.env.SMTP_USER as string,
          pass: process.env.SMTP_PASSWORD as string,
        },
      });

      const info = await transporter.sendMail({
        from: "Contour Expedition",
        to: i?.email,
        subject: "Regarding due payment",
        html: `<div>
    <div class="container">
     <div class="content">
         <p class="heading">Hello, this is a gentle reminder that you have overdue payments ${i?.remainingAmount}. Please make a payment soon.</p>
         
     </div>
     <div class="footer">
         <p>Thanks and Regards, Contour Expedition .</p>
         <p>For any queries contact us here:</p>
        <p>
       
        </p>
         <p>Phone: +977 9761725425</p>     
 </div>
 </div>
   </div>`,
      });
      console.log(info);
    });
  }
});

export async function deleteManyBookingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii");
    if (req.body.id) {
      await deleteManyBooking({ bookingId: { $in: req.body.id } });
      return res.json({
        status: "success",
        msg: "Delete success",
        data: {},
      });
    } else {
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

export async function updatePaymentStatusBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
      return;
    }

    const updatedCostBooking = await findAndUpdateBooking(
      { bookingId },
      { ...req.body, isSeen: true },
      {
        new: true,
      }
    );
    let updatedGroupDeparture;

    if (req.body.paymentStatus == "succeeded" && updatedCostBooking?.departure) {
      updatedGroupDeparture = await findAndUpdateGroupDeparture(
        { groupDepartureId: updatedCostBooking?.departure?.groupDepartureId },
        { $inc: { soldQuantity: (updatedCostBooking?.adults ? updatedCostBooking?.adults : 0) + (updatedCostBooking?.childrens ? updatedCostBooking?.childrens : 0) } },
        {
          new: true,
        }
      );
    }

    return res.status(201).json({
      status: "success",
      msg: " success",
      data: updatedCostBooking,
      gd: updatedGroupDeparture,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
