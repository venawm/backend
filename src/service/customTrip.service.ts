import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import CustomTripModel, { CustomTripDocument, CustomTripInput } from "../models/customTrip.model";

export async function createCustomTrip(input: CustomTripInput) {
  const result = await CustomTripModel.create(input);
  return result;
}

export async function findCustomTrip(query: FilterQuery<CustomTripDocument>, options: QueryOptions = { lean: true }) {
  const result = await CustomTripModel.findOne(query, {}, options).populate("expedition"); ;
  return result;
}

export async function findAndUpdateCustomTrip(query: FilterQuery<CustomTripDocument>, update: UpdateQuery<CustomTripDocument>, options: QueryOptions) {
  return CustomTripModel.findOneAndUpdate(query, update, options).populate("expedition"); ;
}

export async function deleteCustomTrip(query: FilterQuery<CustomTripDocument>) {
  return CustomTripModel.deleteOne(query);

}


export async function findAllCustomTrip(query: FilterQuery<CustomTripDocument>, options: QueryOptions = { lean: true }) {
  const result = await CustomTripModel.find(query, {}, options).sort({ createdAt: -1 }).populate("expedition"); 
  return result;
}

export async function deleteManyCustomTrip(query: FilterQuery<CustomTripDocument>) {
  return CustomTripModel.deleteMany(query);
}



