import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ExpeditionModel, { ExpeditionDocument, ExpeditionInput } from "../models/expedition";

export async function createExpedition(input: ExpeditionInput) {
  const result = await ExpeditionModel.create(input);
  return result;
}

export async function findExpedition(query: FilterQuery<ExpeditionDocument>, options: QueryOptions = { lean: true }) {
  const result = await ExpeditionModel.findOne(query, {}, options).populate("category").populate("collections");
  return result;
}

export async function findManyExpedition(query: FilterQuery<ExpeditionDocument>, options: QueryOptions = { lean: true }) {
  const result = await ExpeditionModel.find(query, {}, options).populate("category").populate("collections");
  return result;
}

export async function findAndUpdateExpedition(query: FilterQuery<ExpeditionDocument>, update: UpdateQuery<ExpeditionDocument>, options: QueryOptions) {
  return ExpeditionModel.findOneAndUpdate(query, update, options).populate("collections").populate("category");
}

export async function deleteExpedition(query: FilterQuery<ExpeditionDocument>) {
  return ExpeditionModel.deleteOne(query);
}

export async function findAllExpedition(query: FilterQuery<ExpeditionDocument>) {
  const result = await ExpeditionModel.find(query).populate("collections").populate("category");
  return result;
}


// export async function findAllExpeditionWithoutPopulate() {
//   const result = await ExpeditionModel.find();
//   return result;
// }

export async function findAllExpeditionWithoutPopulate(query: FilterQuery<ExpeditionDocument>, options: QueryOptions = { lean: true }) {
  const result = await ExpeditionModel.find(query, {}, options)
  console.log(result)
  return result;
}

export async function findAllUpcomingExpedition() {
  const result = await ExpeditionModel.find({ isUpcoming: "yes", type: "expedition" });
  return result;
}

export async function findAllUpcomingTrekking() {
  const result = await ExpeditionModel.find({ isUpcoming: "yes", type: "trekking" });
  return result;
}


export async function findAllExpeditionByType(query: FilterQuery<ExpeditionDocument>, options: QueryOptions = { lean: true }) {
  const results = await ExpeditionModel.find(query, {}, options).sort({ createdAt: -1 });
  return results;
}

export async function findAllExpeditionByMeter(query: FilterQuery<ExpeditionDocument>, options: QueryOptions = { lean: true }) {
  const results = await ExpeditionModel.find(query, {}, options).sort({ createdAt: -1 });
  return results;
}

export async function deleteManyExpedition(query: FilterQuery<ExpeditionDocument>) {
  return ExpeditionModel.deleteMany(query);
}
