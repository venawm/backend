import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";
import { ActivityDocument } from "./activity.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface IternaryInput {
  day: string;
  title: string;
  description?: string;
  shortDescription?:string;
  images?:string[]
  expedition?: ExpeditionDocument["_id"];
  activity?: ActivityDocument["_id"];

}

export interface IternaryDocument extends IternaryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const iternarySchema = new mongoose.Schema(
  {
    iternaryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `iternary_${nanoid()}`,
    },
    day: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    shortDescription: { type: String },
    images: { type: Array(String) },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
    activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  },
  {
    timestamps: true,
  }
);

const IternaryModel = mongoose.model<IternaryDocument>("Iternary", iternarySchema);

export default IternaryModel;
