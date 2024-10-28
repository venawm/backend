import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TrainingModel, { TrainingDocument, TrainingInput } from "../models/training.model";

export async function createTraining(input: TrainingInput) {
  const result = await TrainingModel.create(input);
  return result;
}

export async function findTraining(query: FilterQuery<TrainingDocument>, options: QueryOptions = { lean: true }) {
  const result = await TrainingModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateTraining(query: FilterQuery<TrainingDocument>, update: UpdateQuery<TrainingDocument>, options: QueryOptions) {
  return TrainingModel.findOneAndUpdate(query, update, options);
}

export async function deleteTraining(query: FilterQuery<TrainingDocument>) {
  return TrainingModel.deleteOne(query);
}

// export async function findAllTraining() {
//   const results = await TrainingModel.find().sort({ order: 1 });
//   return results;
// }

export async function findAllTraining() {
    return TrainingModel.find().sort({ createdAt: -1 });
}

export async function deleteManyTraining(query: FilterQuery<TrainingDocument>) {
  return TrainingModel.deleteMany(query);
}

