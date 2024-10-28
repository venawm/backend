import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ActivityInput {
  name: string;
  banner: string;
  description: string;
  slug:string;
  price:number;
  previousPrice:number;
}

export interface ActivityDocument extends ActivityInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new mongoose.Schema(
  {
    activityId: {
      type: String,
      required: true,
      unique: true,
      default: () => `activity_${nanoid()}`,
    },
    name: { type: String, required: true,unique:true },
    price:{type:Number,required:true},
    previousPrice:{type:Number,required:true},
    slug: { type: String, required: true,unique:true },
    description: { type: String, required: true },
    banner: { type: String, required: true },
    images: { type: Array(String)},
  },
  {
    timestamps: true,
  }
);

const ActivityModel = mongoose.model<ActivityDocument>("Activity", activitySchema);

export default ActivityModel;
