import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface AddOnInput {
 fieldName:string;
 price:number;
 description?:string;
}

export interface AddOnDocument extends AddOnInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const addOnSchema = new mongoose.Schema(
  {
    addOnId: {
      type: String,
      required: true,
      unique: true,
      default: () => `addOn_${nanoid()}`,
    },
    fieldName: { type: String, required: true },
    price: { type: Number, required: true },
    description:{type:String}
  },
  {
    timestamps: true,
  }
);

const AddOnModel = mongoose.model<AddOnDocument>("AddOn", addOnSchema);

export default AddOnModel;
