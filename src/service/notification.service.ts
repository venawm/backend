import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import NotificationModel, { NotificationDocument, NotificationInput } from "../models/notification.model";

export async function createNotification(input: NotificationInput) {
  const result = await NotificationModel.create(input);
  return result;
}


export async function findNotification(query: FilterQuery<NotificationDocument>, options: QueryOptions = { lean: true }) {
    const result = await NotificationModel.findOne(query, {}, options);
    return result;
  }

export async function findAndUpdateNotification(query: FilterQuery<NotificationDocument>, update: UpdateQuery<NotificationDocument>, options: QueryOptions) {
    return NotificationModel.findOneAndUpdate(query, update, options);
  }


export async function findAllNotification() {
  const result = await NotificationModel.find().sort({ createdAt: -1 }); 
  return result;
}

export async function deleteNotification(query: FilterQuery<NotificationDocument>) {
  return NotificationModel.deleteOne(query);
}

export async function deleteManyNotification(query: FilterQuery<NotificationDocument>) {
  return NotificationModel.deleteMany(query);
}
