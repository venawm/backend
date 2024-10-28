import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PrivateDepartureModel, { PrivateDepartureDocument, PrivateDepartureInput } from "../models/privateDeparture.model";

export async function createPrivateDeparture(input: PrivateDepartureInput) {
  const result = await PrivateDepartureModel.create(input);
  return result;
}

export async function findPrivateDeparture(query: FilterQuery<PrivateDepartureDocument>, options: QueryOptions = { lean: true }) {
  const result = await PrivateDepartureModel.findOne(query, {}, options)
  return result;
}

export async function findAndUpdatePrivateDeparture(query: FilterQuery<PrivateDepartureDocument>, update: UpdateQuery<PrivateDepartureDocument>, options: QueryOptions) {
  return PrivateDepartureModel.findOneAndUpdate(query, update, options)
}

export async function deletePrivateDeparture(query: FilterQuery<PrivateDepartureDocument>) {
  return PrivateDepartureModel.deleteOne(query);
}

export async function findAllPrivateDeparture() {
  const result = await PrivateDepartureModel.find()
  return result;
}

export async function findPrivateDepartureByExpedition(query: FilterQuery<PrivateDepartureDocument>, options: QueryOptions = { lean: true }) {
  const result = await PrivateDepartureModel.find(query, {}, options);
  return result;
}

export async function deleteManyPrivateDeparture(query: FilterQuery<PrivateDepartureDocument>) {
  return PrivateDepartureModel.deleteMany(query);
}
