import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import MediaModel, { MediaDocument, MediaInput } from "../models/media";

export async function createMedia(input: MediaInput) {
  const result = await MediaModel.create(input);
  return result;
}

export async function findMedia(query: FilterQuery<MediaDocument>, options: QueryOptions = { lean: true }) {
  const result = await MediaModel.findOne(query, {}, options);
  return result;
}

export async function findMediaByExpedition(query: FilterQuery<MediaDocument>, options: QueryOptions = { lean: true }) {
  const results = await MediaModel.find(query, {}, options).sort({ createdAt: -1 });
  return results;
}

export async function findAndUpdateMedia(query: FilterQuery<MediaDocument>, update: UpdateQuery<MediaDocument>, options: QueryOptions) {
  return MediaModel.findOneAndUpdate(query, update, options);
}

export async function deleteMedia(query: FilterQuery<MediaDocument>) {
  return MediaModel.deleteOne(query);
}

export async function findAllMedia() {
  const result = await MediaModel.find().sort({ createdAt: -1 }); 
  return result;
}


export async function deleteManyMedia(query: FilterQuery<MediaDocument>) {
  return MediaModel.deleteMany(query);
}
