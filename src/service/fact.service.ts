import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import FactModel, { FactInput, FactDocument } from "../models/fact.model";

export async function createFact(input: FactInput) {
  const result = await FactModel.create(input);
  return result;
}

export async function findFact(query: FilterQuery<FactDocument>, options: QueryOptions = { lean: true }) {
  const result = await FactModel.findOne(query, {}, options);
  return result;
}

export async function findFactByExpedition(query: FilterQuery<FactDocument>, options: QueryOptions = { lean: true }) {
  const result = await FactModel.find(query, {}, options).sort({ createdAt: -1 });
  return result;
}

export async function findAndUpdateFact(query: FilterQuery<FactDocument>, update: UpdateQuery<FactDocument>, options: QueryOptions) {
  return FactModel.findOneAndUpdate(query, update, options);
}

export async function deleteFact(query: FilterQuery<FactDocument>) {
  return FactModel.deleteOne(query);
}

export async function findAllFact() {
  const result = await FactModel.find().sort({ createdAt: -1 }); 
  return result;
}

export async function deleteManyFact(query: FilterQuery<FactDocument>) {
  return FactModel.deleteMany(query);
}
