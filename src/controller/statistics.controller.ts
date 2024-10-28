import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

import { Collection } from "mongoose";
import CollectionModel from "../models/collection.model";
import CategoryModel from "../models/category.model";
import ExpeditionModel from "../models/expedition";
import BookingModel from "../models/booking.model";

var colors = require("colors");



export async function getNestedData(req: Request, res: Response) {
  try {
    // Fetch collections with selected fields
    const collections = await CollectionModel.find({})
      .select("name image")
      .lean();

    // Fetch categories with references populated and selected fields
    const categories = await CategoryModel.find({})
      .select("name image collections")
      .populate("collections", "name image")
      .lean();

    // Fetch expeditions with references populated and selected fields
    const expeditions = await ExpeditionModel.find({})
      .select("name subheading category banner expeditionId collections slug")
      .populate("category", "name image ")
      .populate("collections", "name image")
      .lean();

    // Structure the data
    return res.json({
      status: "success",
      msg: "Get all data success",
      expedition: expeditions,
      collections: collections,
      categories: categories,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
}


export async function getOverviewData(req: Request, res: Response) {
  try {
    const { startDate, endDate } = req.body;
    console.log(req.body)

    const result = await BookingModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 }, // Grouping by null means all documents are aggregated into one group
          totalRevenueAmount: { $sum: "$totalAmount" }, // Calculate the sum of the 'totalAmount' field
          totalTrekkers: { $sum: { $add: ["$adults", "$childrens"] } },
          averageBookingValue: { $avg: "$totalAmount" },
          outstandingPayments: { $sum: "$remainingAmount" }
        }
      }

    ]);

    console.log(result)
    const data2 = result.length > 0 ? result[0] : {
      totalBookings: 0,
      totalRevenueAmount: 0,
      totalTrekkers: 0,
      averageBookingValue: 0,
      outstandingPayments: 0
    }

    // Structure the data
    return res.json({
      status: "success",
      msg: "Get all data success",
      booking: data2.totalBookings,
      trekkers: data2.totalTrekkers, revenue: data2?.totalRevenueAmount,
      avgBooking: data2.averageBookingValue,
      outstandingPayments: data2?.outstandingPayments

    });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
}

export async function getFullPaymentsData(req: Request, res: Response) {
  try {
    const { startDate, endDate } = req.body;
    console.log(req.body)

    const result = await BookingModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          },
          paymentOption: "full-payment"
        }
      },
      {
        $group: {
          _id: null,
          totalFullPayments: { $sum: "$totalAmount" }, // Grouping by null means all documents are aggregated into one group

          averageFullPayments: { $avg: "$totalAmount" },

        }
      }

    ]);

    console.log(result)
    const data2 = result.length > 0 ? result[0] : {
      totalFullPayments: 0,
      averageFullPayments: 0
    }

    // Structure the data
    return res.json({
      status: "success",
      msg: "Get all data success",
      totalFullPayments: data2?.totalFullPayments,
      averageFullPayments: data2?.averageFullPayments

    });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
}


export async function getAdvPaymentsData(req: Request, res: Response) {
  try {
    const { startDate, endDate } = req.body;
    console.log(req.body)

    const result = await BookingModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          },
          paymentOption: "deposit-payment"
        }
      },
      {
        $group: {
          _id: null,
          totalDepositPayments: { $sum: "$depositAmount" }, // Grouping by null means all documents are aggregated into one group
          count: { $sum: 1 },
          averageDepositPayments: { $avg: "$depositAmount" },

        }
      }

    ]);

    console.log(result)
    const data2 = result.length > 0 ? result[0] : {
      totalDepositPayments: 0,
      averageDepositPayments: 0
    }

    // Structure the data
    return res.json({
      status: "success",
      msg: "Get all data success",
      totalDepositPayments: data2?.totalDepositPayments,
      averageDepositPayments: data2?.averageDepositPayments,
      count: data2?.count

    });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
}



export async function getBookingTrends(req: Request, res: Response) {
  try {
    const { startDate, endDate } = req.body;
    console.log(req.body);

    // Parse dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Aggregate both full and deposit payments
    const dailyPayments = await BookingModel.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          paymentOption: { $in: ["full-payment", "deposit-payment"] }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            paymentOption: "$paymentOption"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
            day: "$_id.day"
          },
          fullPaymentCount: {
            $sum: {
              $cond: [{ $eq: ["$_id.paymentOption", "full-payment"] }, "$count", 0]
            }
          },
          depositPaymentCount: {
            $sum: {
              $cond: [{ $eq: ["$_id.paymentOption", "deposit-payment"] }, "$count", 0]
            }
          }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
      },
      {
        $project: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day"
                }
              }
            }
          },
          fullPaymentCount: 1,
          depositPaymentCount: 1
        }
      }
    ]);

    // Format the results
    const formatResults = (results: any) => {
      return results.map((item: any) => ({
        date: item.date,
        fullPaymentCount: item.fullPaymentCount,
        depositPaymentCount: item.depositPaymentCount
      }));
    };

    console.log(dailyPayments);

    return res.json({
      status: "success",
      msg: "Get all data success",
      dailyPayments: formatResults(dailyPayments)
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
}
