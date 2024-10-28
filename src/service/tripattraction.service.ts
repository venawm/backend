import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TripAttractionModel, { TripAttractionInput, TripAttractionDocument } from "../models/tripattraction.model";

export async function createTripAttraction(input: TripAttractionInput) {
    const result = await TripAttractionModel.create(input);
    return result;
}

export async function findTripAttraction(query: FilterQuery<TripAttractionDocument>, options: QueryOptions = { lean: true }) {
    const result = await TripAttractionModel.findOne(query, {}, options);
    return result;
}

export async function findTripAttractionByExpedition(query: FilterQuery<TripAttractionDocument>, options: QueryOptions = { lean: true }) {
    const result = await TripAttractionModel.find(query, {}, options);
    return result;
}

export async function findAndUpdateTripAttraction(query: FilterQuery<TripAttractionDocument>, update: UpdateQuery<TripAttractionDocument>, options: QueryOptions) {
    return TripAttractionModel.findOneAndUpdate(query, update, options);
}

export async function deleteTripAttraction(query: FilterQuery<TripAttractionDocument>) {
    return TripAttractionModel.deleteOne(query);
}

export async function deleteManyTripAttraction(query: FilterQuery<TripAttractionDocument>) {
    return TripAttractionModel.deleteMany(query);
  }

  
// export async function findAllTripAttraction() {
//     const result = await TripAttractionModel.find().sort({ createdAt: -1 });
//     return result;
// }



export async function findAllTripAttraction(query: FilterQuery<TripAttractionDocument>, options: QueryOptions = { lean: true }) {
    const result = await TripAttractionModel.find(query, {}, options); 
    return result;
}