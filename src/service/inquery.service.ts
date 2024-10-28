import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import InquiryModel, { InquiryDocument, InquiryInput } from "../models/inquery.model";

export async function createInquiry(input: InquiryInput) {
  const result = await InquiryModel.create(input);
  return result;
}

export async function findInquiry(query: FilterQuery<InquiryDocument>, options: QueryOptions = { lean: true }) {
  const result = await InquiryModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateInquiry(query: FilterQuery<InquiryDocument>, update: UpdateQuery<InquiryDocument>, options: QueryOptions) {
  return InquiryModel.findOneAndUpdate(query, update, options);
}

export async function deleteInquiry(query: FilterQuery<InquiryDocument>) {
  return InquiryModel.deleteOne(query);
}

export async function findAllInquiry() {
  const result = await InquiryModel.find().sort({ createdAt: -1 }); 
  return result;
}

export async function deleteManyInquiry(query: FilterQuery<InquiryDocument>) {
  return InquiryModel.deleteMany(query);
}
