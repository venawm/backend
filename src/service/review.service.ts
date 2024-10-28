import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ReviewModel, { ReviewInput, Review } from "../models/review.model";


export async function createReview(input: ReviewInput) {
  const result = await ReviewModel.create(input);
  return result;
}

export async function findReview(query: FilterQuery<Review>, options: QueryOptions = { lean: true }) {
  const result = await ReviewModel.findOne(query, {}, options).populate("expedition").populate("user");
  return result;
}

export async function findAndUpdateReview(query: FilterQuery<Review>, update: UpdateQuery<Review>, options: QueryOptions) {
  return ReviewModel.findOneAndUpdate(query, update, options);
}

export async function deleteReview(query: FilterQuery<Review>) {
  return ReviewModel.deleteOne(query);
}

export async function findAllReview() {
  const result = await ReviewModel.find().sort({ createdAt: -1 }); 
  return result;
}

export async function findReviewByExpedition(query: FilterQuery<Review>, options: QueryOptions = { lean: true }) {
  const result = await ReviewModel.find(query, {}, options).sort({ createdAt: -1 }).populate("expedition").populate("user");
  return result;
}
export async function deleteManyReview(query: FilterQuery<Review>) {
  return ReviewModel.deleteMany(query);
}


// export async function findReviewByTeam(query: FilterQuery<Review>, options: QueryOptions = { lean: true }) {
//   const results = await ReviewModel.find(query, {}, options).sort({ createdAt: -1 }); 
//   return results;
// }