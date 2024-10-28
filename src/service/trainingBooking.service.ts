import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TrainingBookingModel, { TrainingBookingDocument, TrainingBookingInput } from "../models/trainingBooking.model";

export async function createTrainingBooking(input: TrainingBookingInput) {
  const result = await TrainingBookingModel.create(input);
  return result;
}

export async function findTrainingBooking(query: FilterQuery<TrainingBookingDocument>, options: QueryOptions = { lean: true }) {
  const result = await TrainingBookingModel.findOne(query, {}, options).populate('training').populate("user");
  return result;
}

export async function findAndUpdateTrainingBooking(query: FilterQuery<TrainingBookingDocument>, update: UpdateQuery<TrainingBookingDocument>, options: QueryOptions) {
  return TrainingBookingModel.findOneAndUpdate(query, update, options).populate('training').populate("user");
}

export async function deleteTrainingBooking(query: FilterQuery<TrainingBookingDocument>) {
  return TrainingBookingModel.deleteOne(query);

}

// export async function findAllTrainingBooking() {
export async function findAllTrainingBooking(query: FilterQuery<TrainingBookingDocument>, options: QueryOptions = { lean: true }) {
  const result = await TrainingBookingModel.find(query, {}, options).populate("training").populate("user").sort({ createdAt: -1 }); 
  return result;
}


