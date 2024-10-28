import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import IternaryModel, { IternaryDocument, IternaryInput } from "../models/iternary";

export async function createIternary(input: IternaryInput) {
  const result = await IternaryModel.create(input);
  return result;
}

export async function findIternary(query: FilterQuery<IternaryDocument>, options: QueryOptions = { lean: true }) {
  const result = await IternaryModel.findOne(query, {}, options);
  return result;
}

export async function findIternaryByExpedition(query: FilterQuery<IternaryDocument>, options: QueryOptions = { lean: true }) {
  const results = await IternaryModel.find(query, {}, options);
  return results;
}

export async function findAndUpdateIternary(query: FilterQuery<IternaryDocument>, update: UpdateQuery<IternaryDocument>, options: QueryOptions) {
  return IternaryModel.findOneAndUpdate(query, update, options);
}

export async function deleteIternary(query: FilterQuery<IternaryDocument>) {
  return IternaryModel.deleteOne(query);
}

// export async function findAllExpeditionWithoutPopulate(query: FilterQuery<ExpeditionDocument>, options: QueryOptions = { lean: true }) {
//   const result = await ExpeditionModel.find(query, {}, options)
//   return result;
// }

export async function findAllIternary(query: FilterQuery<IternaryDocument>, options: QueryOptions = { lean: true }) {
  const result = await IternaryModel.find(query, {}, options).sort({ createdAt: -1 }); 
  return result;
}

export async function deleteManyIternary(query: FilterQuery<IternaryDocument>) {
  return IternaryModel.deleteMany(query);
}
