import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CostExcludeModel, { CostExcludeInput, CostExcludeDocument } from "../models/costExclude";

export async function createCostExclude(input: CostExcludeInput) {
  const result = await CostExcludeModel.create(input);
  return result;
}

export async function findCostExclude(query: FilterQuery<CostExcludeDocument>, options: QueryOptions = { lean: true }) {
  const result = await CostExcludeModel.findOne(query, {}, options);
  return result;
}

export async function findCostExcludeByExpedition(query: FilterQuery<CostExcludeDocument>, options: QueryOptions = { lean: true }) {
  const result = await CostExcludeModel.find(query, {}, options).sort({ createdAt: -1 });
  return result;
}

export async function findAndUpdateCostExclude(query: FilterQuery<CostExcludeDocument>, update: UpdateQuery<CostExcludeDocument>, options: QueryOptions) {
  return CostExcludeModel.findOneAndUpdate(query, update, options);
}

export async function deleteCostExclude(query: FilterQuery<CostExcludeDocument>) {
  return CostExcludeModel.deleteOne(query);
}

export async function findAllCostExclude() {
  const result = await CostExcludeModel.find().sort({ createdAt: -1 }); 
  return result;
}
export async function deleteManyCostExclude(query: FilterQuery<CostExcludeDocument>) {
  return CostExcludeModel.deleteMany(query);
}
