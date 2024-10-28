import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ValueAdditionModel, { ValueAdditionInput, ValueAdditionDocument } from "../models/valueAddition.model";

export async function createValueAddition(input: ValueAdditionInput) {
  const result = await ValueAdditionModel.create(input);
  return result;
}

export async function findValueAddition(query: FilterQuery<ValueAdditionDocument>, options: QueryOptions = { lean: true }) {
  const result = await ValueAdditionModel.findOne(query, {}, options);
  return result;
}

export async function findValueAdditionByExpedition(query: FilterQuery<ValueAdditionDocument>, options: QueryOptions = { lean: true }) {
  const result = await ValueAdditionModel.find(query, {}, options).sort({ createdAt: -1 });
  return result;
}

export async function findAndUpdateValueAddition(query: FilterQuery<ValueAdditionDocument>, update: UpdateQuery<ValueAdditionDocument>, options: QueryOptions) {
  return ValueAdditionModel.findOneAndUpdate(query, update, options);
}

export async function deleteValueAddition(query: FilterQuery<ValueAdditionDocument>) {
  return ValueAdditionModel.deleteOne(query);
}

export async function findAllValueAddition() {
  const result = await ValueAdditionModel.find().sort({ createdAt: -1 }); 
  return result;
}

export async function deleteManyValueAddition(query: FilterQuery<ValueAdditionDocument>) {
  return ValueAdditionModel.deleteMany(query);
}

