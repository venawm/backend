import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import FaqModel, { FaqInput, FaqDocument } from "../models/faq.model";
import AppError from "../utils/appError";

interface ISwapObject {
  id1: string;
  id2: String;
}
export async function createFaq(input: FaqInput) {
  const result = await FaqModel.create(input);
  return result;
}

export async function findFaq(query: FilterQuery<FaqDocument>, options: QueryOptions = { lean: true }) {
  const result = await FaqModel.findOne(query, {}, options);
  return result;
}

export async function findFaqByExpedition(query: FilterQuery<FaqDocument>, options: QueryOptions = { lean: true }) {
  const result = await FaqModel.find(query, {}, options).sort({ createdAt: -1 });
  return result;
}

export async function findAndUpdateFaq(query: FilterQuery<FaqDocument>, update: UpdateQuery<FaqDocument>, options?: QueryOptions) {
  return FaqModel.findOneAndUpdate(query, update, options);
}

export async function deleteFaq(query: FilterQuery<FaqDocument>) {
  return FaqModel.deleteOne(query);
}

export async function findAllFaq() {
  const result = await FaqModel.find().sort({ createdAt: -1 });
  return result;
}

export async function deleteManyFaq(query: FilterQuery<FaqDocument>) {
  return FaqModel.deleteMany(query);
}


export const swapFaqOrderService = async (swapObj: ISwapObject) => {
  try {

    if (swapObj.id1 == swapObj.id2)
      return

    const faq1 = await FaqModel.findOne({ faqId: swapObj.id1 }).exec();

    const faq2 = await FaqModel.findOne({ faqId: swapObj.id2 }).exec()


    if (!faq1 || !faq2) {
      throw new AppError("One or both FAQs not found.", 404);
    }

    if (faq1.expedition.toString() !== faq2.expedition.toString()) {
      throw new AppError("FAQs must belong to the same expedition to swap orders.", 400);
    }

    const existingOrders = await FaqModel.find({ expedition: faq1.expedition })
      .select('order')
      .lean();

    let tempOrder = -1;
    while (existingOrders.some(order => order.order === tempOrder)) {
      tempOrder--;
    }

    await Promise.all([
      findAndUpdateFaq({ _id: faq1._id }, { order: tempOrder }, { new: true }),
      findAndUpdateFaq({ _id: faq2._id }, { order: tempOrder }, { new: true }),
    ]);

    await Promise.all([
      findAndUpdateFaq({ _id: faq1._id }, { order: faq2.order }, { new: true }),
      findAndUpdateFaq({ _id: faq2._id }, { order: faq1.order }, { new: true }),
    ]);

  } catch (error) {
    throw error;
  }
};
