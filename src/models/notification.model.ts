import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface NotificationInput {
  
  title: string;
 
  isSeen?: boolean;
}

export interface NotificationDocument extends NotificationInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new mongoose.Schema(
  {
    notificationId: {
      type: String,
      required: true,
      unique: true,
      default: () => `notification_${nanoid()}`,
    },
    title: { type: String, required: true },

    isSeen: { type: Boolean,default: false },
  },
  {
    timestamps: true,
  }
);

const NotificationModel = mongoose.model<NotificationDocument>("Notification", notificationSchema);

export default NotificationModel;
