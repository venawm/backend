import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import FixedDateModel, { FixedDateInput, FixedDateDocument } from "../models/fixedDate.model";

export async function createFixedDate(input: FixedDateInput) {
  const result = await FixedDateModel.create(input);
  return result;
}

export async function findFixedDate(query: FilterQuery<FixedDateDocument>, options: QueryOptions = { lean: true }) {
  const result = await FixedDateModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateFixedDate(query: FilterQuery<FixedDateDocument>, update: UpdateQuery<FixedDateDocument>, options: QueryOptions) {
  return FixedDateModel.findOneAndUpdate(query, update, options);
}

export async function deleteFixedDate(query: FilterQuery<FixedDateDocument>) {
  return FixedDateModel.deleteOne(query);
}

export async function findAllFixedDate() {
  const result = await FixedDateModel.find();
  return result;
}


export async function findAllFixedDateByExpedition(query: FilterQuery<FixedDateDocument>, options: QueryOptions = { lean: true }) {
  const results = await FixedDateModel.find(query, {}, options).sort({ createdAt: -1 }); 
  return results;
}
export async function deleteManyFixedDate(query: FilterQuery<FixedDateDocument>) {
  return FixedDateModel.deleteMany(query);
}
