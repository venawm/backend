import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BookingModel, { BookingDocument, BookingInput } from "../models/booking.model";

export async function createBooking(input: BookingInput) {
  const result = await BookingModel.create(input);
  return result;
}

export async function findBooking(query: FilterQuery<BookingDocument>, options: QueryOptions = { lean: true }) {
  const result = await BookingModel.findOne(query, {}, options).populate('expedition').populate("user").populate("activity").populate("training").populate("departure");
  return result;
}

export async function findAndUpdateBooking(query: FilterQuery<BookingDocument>, update: UpdateQuery<BookingDocument>, options: QueryOptions) {
  return BookingModel.findOneAndUpdate(query, update, options).populate('expedition').populate("user").populate("activity").populate("training").populate("departure");
}

export async function deleteBooking(query: FilterQuery<BookingDocument>) {
  return BookingModel.deleteOne(query);

}

// export async function findAllBooking() {
export async function findAllBooking(query: FilterQuery<BookingDocument>, options: QueryOptions = { lean: true }) {
  const result = await BookingModel.find(query, {}, options).populate("expedition").populate("user").populate("training").populate("activity").populate("departure").sort({ createdAt: -1 }); 
  return result;
}

export async function deleteManyBooking(query: FilterQuery<BookingDocument>) {
  return BookingModel.deleteMany(query);
}

// export async function findAllExpeditionWithoutPopulate(query: FilterQuery<ExpeditionDocument>, options: QueryOptions = { lean: true }) {
//   const result = await ExpeditionModel.find(query, {}, options)
//   console.log(result)
//   return result;
// }a