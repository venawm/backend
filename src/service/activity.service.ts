import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ActivityModel, { ActivityInput, ActivityDocument } from "../models/activity.model";

export async function createActivity(input: ActivityInput) {
  const result = await ActivityModel.create(input);
  return result;
}

export async function findActivity(query: FilterQuery<ActivityDocument>, options: QueryOptions = { lean: true }) {
  const result = await ActivityModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateActivity(query: FilterQuery<ActivityDocument>, update: UpdateQuery<ActivityDocument>, options: QueryOptions) {
  return ActivityModel.findOneAndUpdate(query, update, options);
}

export async function deleteActivity(query: FilterQuery<ActivityDocument>) {
  return ActivityModel.deleteOne(query);
}

export async function deleteManyActivity(query: FilterQuery<ActivityDocument>) {
  return ActivityModel.deleteMany(query);
}

export async function findAllActivity(select: string, filter: any = {}, sortOptions: any = {}) {
  try {
    console.log(filter,select,sortOptions)
    const result = await ActivityModel.find(filter)
      .select(select) 
      .sort(sortOptions)
      .exec();
    return result;
  } catch (error:any) {
    throw new Error('Error fetching activities: ' + error.message);
  }
}
