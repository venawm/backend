import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CostIncludeModel, {
  CostIncludeDocument,
  CostIncludeInput,
} from "../models/costInclude";

export async function createCostInclude(input: CostIncludeInput) {
  const result = await CostIncludeModel.create(input);
  return result;
}

export async function findCostInclude(
  query: FilterQuery<CostIncludeDocument>,
  options: QueryOptions = { lean: true }
) {
  const result = await CostIncludeModel.findOne(query, {}, options);
  return result;
}

export async function findCostIncludeByExpedition(
  query: FilterQuery<CostIncludeDocument>,
  options: QueryOptions = { lean: true }
) {
  const results = await CostIncludeModel.find(query, {}, options).sort({
    createdAt: -1,
  });
  return results;
}

export async function findCostIncludeByIternary(
  query: FilterQuery<CostIncludeDocument>,
  options: QueryOptions = { lean: true }
) {
  const results = await CostIncludeModel.find(query, {}, options).sort({
    createdAt: -1,
  });
  return results;
}

export async function findAndUpdateCostInclude(
  query: FilterQuery<CostIncludeDocument>,
  update: UpdateQuery<CostIncludeDocument>,
  options: QueryOptions
) {
  return CostIncludeModel.findOneAndUpdate(query, update, options);
}

export async function deleteCostInclude(
  query: FilterQuery<CostIncludeDocument>
) {
  return CostIncludeModel.deleteOne(query);
}

export async function deleteManyCostInclude(
  query: FilterQuery<CostIncludeDocument>
) {
  return CostIncludeModel.deleteMany(query);
}

export async function findAllCostInclude(
  query: FilterQuery<CostIncludeDocument>,
  options: QueryOptions = { lean: true }
) {
  const result = await CostIncludeModel.find(query, {}, options).sort({
    createdAt: -1,
  });
  return result;
}
