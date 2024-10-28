import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateFaqInput, UpdateFaqInput } from "../schema/faq.schema";
import {
  createFaq,
  findFaq,
  findAndUpdateFaq,
  deleteFaq,
  findAllFaq,
  findFaqByExpedition,
} from "../service/faq.service";
import { Collection } from "mongoose";
import CollectionModel from "../models/collection.model";
import CategoryModel from "../models/category.model";
import ExpeditionModel from "../models/expedition";

var colors = require("colors");

// export async function getFaqHandler(req: Request<UpdateFaqInput["params"]>, res: Response, next: NextFunction) {
//   try {
//     const faqId = req.params.faqId;
//     const faq = await findFaq({ faqId });

//     if (!faq) {
//       next(new AppError("faq does not exist", 404));
//     }

//     return res.json({
//       status: "success",
//       msg: "Get success",
//       data: faq,
//     });
//   } catch (error: any) {
//     console.error(colors.red("msg:", error.message));
//     next(new AppError("Internal server error", 500));
//   }
// }

export async function getFaqByExpeditionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const expeditionId = req.params.expeditionId;
    const results = await findFaqByExpedition({ expedition: expeditionId });
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

// export async function getNestedData() {
//   try {
//     // const results = await findAllFaq();
//     const collections= await CollectionModel.find({})
//     const categories= await CategoryModel.find({})
//     const expeditions= await ExpeditionModel.find({})

//     console.log(collections)
//     console.log(categories)
//     console.log(expeditions)

//     // return res.json({
//     //   status: "success",
//     //   msg: "Get all faq success",
//     // //   data: results,
//     // });
//   } catch (error: any) {
//     console.error(colors.red("msg:", error.message));
//     // next(new AppError("Internal server error", 500));
//   }
// }

// export async function getNestedData(req:any,res:any) {
//     try {
//       // Fetch collections with selected fields
//       const collections = await CollectionModel.find({})
//         .select('name image')
//         .lean();

//       // Fetch categories with references populated and selected fields
//       const categories = await CategoryModel.find({})
//         .select('name image collections')
//         .populate('collections', 'name image')
//         .lean();

//         // console.log(categories)

//       // Fetch expeditions with references populated and selected fields
//       const expeditions = await ExpeditionModel.find({})
//         .select('name subheading category banner collections ')
//         .populate('category', 'name image')
//         .populate('collections', 'name image')
//         .lean();

//       // Structure the data
//       const nestedData = collections.map((collection) => {
//         const collectionCategories = categories
//           .filter(category => category.collections._id.toString() === collection._id.toString())
//           .map(category => {
//             const categoryExpeditions = expeditions
//               .filter(expedition => expedition.category._id.toString() === category._id.toString())
//               .map(expedition => ({
//                 _id: expedition._id,
//                 name: expedition.name,
//                 subheading: expedition.subheading,
//                 image: expedition.banner,

//               }));

//             return {
//               _id: category._id,
//               name: category.name,
//               image: category.image,
//               expeditions: categoryExpeditions,
//             };
//           });

//         return {
//           _id: collection._id,
//           name: collection.name,
//           image: collection.image,
//           categories: collectionCategories,
//         };
//       });

//     //   console.log(JSON.stringify(collectionsMap, null, 2));
//     //   return collectionsMap;
//     // console.log(nestedData)
//     // console.log(JSON.stringify(nestedData, null, 2));
//     // return nestedData;
//     return res.json({
//       status: "success",
//       msg: "Get all faq success",
//       data: nestedData,
//     });

//     } catch (error: any) {
//       console.error('Error:', error.message);
//     }
//   }
export async function getNestedData(req: Request, res: Response) {
  try {
    // Fetch collections with selected fields
    const collections = await CollectionModel.find({})
      .select("name image slug")
      .lean();

    // Fetch categories with references populated and selected fields
    const categories = await CategoryModel.find({})
      .select("name image collections slug")
      .populate("collections", "name image slug")
      .lean();

    // Fetch expeditions with references populated and selected fields
    const expeditions = await ExpeditionModel.find({})
      .select("name subheading category banner expeditionId collections slug")
      .populate("category", "name image slug")
      .populate("collections", "name image slug")
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
