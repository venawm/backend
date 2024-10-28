import mongoose, { Document, Model } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface SubscriberInput {
  email: string;
}

export interface SubscriberDocument extends SubscriberInput, Document {
  subscriberId: string;
  createdAt: Date;
  updatedAt: Date;
}

const subscriberSchema = new mongoose.Schema<SubscriberDocument>(
  {
    subscriberId: {
      type: String,
      required: true,
      unique: true,
      default: () => `subscriber_${nanoid()}`,
    },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const SubscriberModel: Model<SubscriberDocument> = mongoose.model<SubscriberDocument>("Subscriber", subscriberSchema);

export default SubscriberModel;
