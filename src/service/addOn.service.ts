import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import AddOnModel, { AddOnInput, AddOnDocument } from "../models/addOn.model";

export async function createAddOn(input: AddOnInput) {
  const result = await AddOnModel.create(input);
  return result;
}

export async function findAddOn(query: FilterQuery<AddOnDocument>, options: QueryOptions = { lean: true }) {
  const result = await AddOnModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateAddOn(query: FilterQuery<AddOnDocument>, update: UpdateQuery<AddOnDocument>, options: QueryOptions) {
  return AddOnModel.findOneAndUpdate(query, update, options);
}

export async function deleteAddOn(query: FilterQuery<AddOnDocument>) {
  return AddOnModel.deleteOne(query);
}

export async function findAllAddOn(select: string, filter: any = {}, sortOptions: any = {}) {
  try {
    console.log(filter,select,sortOptions)
    const result = await AddOnModel.find(filter)
      .select(select) 
      .sort(sortOptions)
      .exec();
    return result;
  } catch (error:any) {
    throw new Error('Error fetching add ons: ' + error.message);
  }
}

export async function deleteManyAddOn(query: FilterQuery<AddOnDocument>) {
  return AddOnModel.deleteMany(query);
}