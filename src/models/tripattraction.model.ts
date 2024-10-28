import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface TripAttractionInput {
  title: string;
  description?: string;
  expedition: ExpeditionDocument["_id"];
  order:number;
 
}

export interface TripAttractionDocument extends TripAttractionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const tripAttractionSchema = new mongoose.Schema(
  {
    tripAttractionId: {
      type: String,
      required: true,
      unique: true,
      default: () => `trip-attraction_${nanoid()}`,
    },
    title: { type: String, required: true },
    description: { type: String },
    order:{type:Number,required:true},
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
  },
  {
    timestamps: true,
  }
);

const TripAttractionModel = mongoose.model<TripAttractionDocument>("TripAttraction", tripAttractionSchema);

export default TripAttractionModel;
