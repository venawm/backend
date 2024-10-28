import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import {
  CreateExpeditionInput,
  findExpeditionFromCategoryInput,
  findExpeditionFromCollectionInput,
  ReadExpeditionInput,
  UpdateExpeditionInput,
} from "../schema/expedition.schema";
import {
  createExpedition,
  findExpedition,
  findAndUpdateExpedition,
  deleteExpedition,
  findAllExpedition,
  findAllExpeditionByType,
  findAllExpeditionByMeter,
  findAllUpcomingExpedition,
  findAllUpcomingTrekking,
  findManyExpedition,
  findAllExpeditionWithoutPopulate,
  deleteManyExpedition,
} from "../service/expedition.service";
import ExpeditionModel from "../models/expedition";
import GroupDepartureModel from "../models/groupDeparture.model";
import { Types } from "mongoose";
import ReviewModel from "../models/review.model";
var colors = require("colors");

export async function createExpeditionHandler(
  req: Request<{}, {}, CreateExpeditionInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { files } = req as {
      files: { [fieldname: string]: Express.Multer.File[] };
    };

    let img1;
    if (files && files["banner"]) {
      const banner = files["banner"][0];
      img1 = await uploadSingleFile(banner);
    }
    let img2;
    if (files && files["routeMap"]) {
      const routeMap = files["routeMap"][0];
      img2 = await uploadSingleFile(routeMap);
    }

    const body = req.body;
    const expedition = await createExpedition({ ...body });
    return res.json({
      status: "success",
      msg: "Create success",
      data: expedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function updateExpeditionHandler(
  req: Request<UpdateExpeditionInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    const { files } = req as {
      files?: { [fieldname: string]: Express.Multer.File[] };
    }; // '?' to make files optional

    const expeditionId = req.params.expeditionId;
    const expedition = await findExpedition({ expeditionId });
    if (!expedition) {
      next(new AppError("expedition detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img1 = expedition.banner;
    if (files && files["banner"]) {
      const banner = files["banner"][0];
      img1 = await uploadSingleFile(banner);
    }

    let img2 = expedition.routeMap;
    if (files && files["routeMap"]) {
      const routeMap = files["routeMap"][0];
      img2 = await uploadSingleFile(routeMap);
    }

    const updatedExpedition = await findAndUpdateExpedition(
      { expeditionId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedExpedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError(error.message, 500));
  }
}

export async function getExpeditionHandler(
  req: Request<UpdateExpeditionInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const expeditionId = req.params.expeditionId;
    const expedition = await findExpedition({
      $or: [{ expeditionId }, { slug: expeditionId }],
    });

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

export async function getExpeditionByObjectIdHandler(
  req: Request<UpdateExpeditionInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.expeditionId;
    const expedition = await findExpedition({ expedition: id });

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

export async function deleteExpeditionHandler(
  req: Request<UpdateExpeditionInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const expeditionId = req.params.expeditionId;
    const expedition = await findExpedition({ expeditionId });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    await deleteExpedition({ expeditionId });
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

export async function getAllExpeditionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filter = req.query;
    const results = await findAllExpedition(filter);
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

export async function getAllExpeditionWithoutPopulateHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filter = req.query; // Using query instead of body
    console.log(
      filter,
      "---------------------------------------------------------------------------------------"
    );
    const results = await findAllExpeditionWithoutPopulate(filter);
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

export async function getAllUpcomingExpeditionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const results = await findAllUpcomingExpedition();
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

export async function getAllUpcomingTrekkingHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const results = await findAllUpcomingTrekking();
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

export async function getAllExpeditionByTypeHandler(
  req: Request<UpdateExpeditionInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const type = req.params.expeditionId;
    const expeditions = await findAllExpeditionByType({ type });
    return res.json({
      status: "success",
      msg: "Get success",
      data: expeditions,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllExpeditionByMeterHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const meter = req.params.meter;
    const expeditions = await findAllExpeditionByMeter({ meter });
    return res.json({
      status: "success",
      msg: "Get success",
      data: expeditions,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllExpeditionBySeasonTypeHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const season = req.params.season;
    const query: any = {};
    query[season] = "true";
    const expeditions = await ExpeditionModel.find(query);
    return res.json({
      status: "success",
      msg: "Get success",
      data: expeditions,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getExpeditionFromCollectionHandler(
  req: Request<findExpeditionFromCollectionInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const collectionId = req.params.collectionId;
    const expedition = await findExpedition({
      collections: { $eq: collectionId },
    });

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

export async function getExpeditionFromCategoryHandler(
  req: Request<findExpeditionFromCategoryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.params.categoryId;
    const expedition = await findManyExpedition({
      $and: [{ category: { $eq: categoryId } }, { isPublished: true }],
    });

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

export async function getExpeditionFromCategoryDashboardHandler(
  req: Request<findExpeditionFromCategoryInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.params.categoryId;
    const expedition = await findManyExpedition({
      category: { $eq: categoryId },
    });

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

export async function filterExpedition(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filter = req.body;
    const expedition = await findExpedition(filter);

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

export async function getMinimumPriceData(req: Request, res: Response) {
  try {
    const expeditionId = req.params.expeditionId;

    // Convert expeditionId to ObjectId
    const objectId = new Types.ObjectId(expeditionId);
    // Aggregate to find the document with the minimum price
    const result = await GroupDepartureModel.aggregate([
      {
        $match: { expedition: objectId }, // Match documents with the specified expeditionId
      },
      {
        $sort: { price: 1 }, // Sort documents by price in ascending order
      },
      {
        $limit: 1, // Limit to the first document after sorting
      },
    ]);

    // Check if any document was found

    return res.json({
      status: "success",
      msg: "Document with minimum price retrieved successfully",
      result: result[0],
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
}

export async function deleteManyExpeditionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("hii");
    if (req.body.id) {
      await deleteManyExpedition({ expeditionId: { $in: req.body.id } });
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

export async function getReviewsStats(req: Request, res: Response) {
  try {
    const expeditionId = req.params.expeditionId;
    const objectId = new Types.ObjectId(expeditionId);
    console.log(req.body);

    const result = await ReviewModel.aggregate([
      {
        $match: {
          expedition: objectId,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 }, // Grouping by null means all documents are aggregated into one group

          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    console.log(result);
    const data2 =
      result.length > 0
        ? result[0]
        : {
            total: 0,
            averageRating: 0,
          };

    // Structure the data
    return res.json({
      status: "success",
      msg: "Get all data success",
      total: data2.total,
      average: data2.averageRating,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
}
