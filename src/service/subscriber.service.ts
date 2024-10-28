import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import SubscriberModel, { SubscriberDocument, SubscriberInput } from "../models/subscriber.model";

export async function createSubscriber(input: SubscriberInput): Promise<SubscriberDocument> {
  return SubscriberModel.create(input);
}

export async function findAllSubscribers(query: FilterQuery<SubscriberDocument>, options: QueryOptions = { lean: true }): Promise<SubscriberDocument[]> {
  return SubscriberModel.find(query, {}, options).sort({ createdAt: -1 });
}

export async function findSubscriber(query: FilterQuery<SubscriberDocument>, options: QueryOptions = { lean: true }): Promise<SubscriberDocument | null> {
  return SubscriberModel.findOne(query, {}, options);
}

export async function findAndUpdateSubscriber(query: FilterQuery<SubscriberDocument>, update: UpdateQuery<SubscriberDocument>, options: QueryOptions): Promise<SubscriberDocument | null> {
  return SubscriberModel.findOneAndUpdate(query, update, options);
}

export async function deleteSubscriber(query: FilterQuery<SubscriberDocument>): Promise<{ deletedCount?: number }> {
  return SubscriberModel.deleteOne(query);
}

export async function deleteManySubscriber(query: FilterQuery<SubscriberDocument>) {
  return SubscriberModel.deleteMany(query);
}
