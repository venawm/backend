import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ActivityBookingModel, { ActivityBookingDocument, ActivityBookingInput } from "../models/activityBooking.model";

export async function createActivityBooking(input: ActivityBookingInput) {
  const result = await ActivityBookingModel.create(input);
  return result;
}

export async function findActivityBooking(query: FilterQuery<ActivityBookingDocument>, options: QueryOptions = { lean: true }) {
  const result = await ActivityBookingModel.findOne(query, {}, options).populate('activity').populate("user");
  return result;
}

export async function findAndUpdateActivityBooking(query: FilterQuery<ActivityBookingDocument>, update: UpdateQuery<ActivityBookingDocument>, options: QueryOptions) {
  return ActivityBookingModel.findOneAndUpdate(query, update, options).populate('activity').populate("user");
}

export async function deleteActivityBooking(query: FilterQuery<ActivityBookingDocument>) {
  return ActivityBookingModel.deleteOne(query);

}

// export async function findAllActivityBooking() {
export async function findAllActivityBooking(query: FilterQuery<ActivityBookingDocument>, options: QueryOptions = { lean: true }) {
  const result = await ActivityBookingModel.find(query, {}, options).populate("activity").populate("user").sort({ createdAt: -1 }); 
  return result;
}


