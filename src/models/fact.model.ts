import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface FactInput {
  title: string;
  icon: string;
  description: string;
  expedition: ExpeditionDocument["_id"];
 
}

export interface FactDocument extends FactInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const factSchema = new mongoose.Schema(
  {
    factId: {
      type: String,
      required: true,
      unique: true,
      default: () => `fact_${nanoid()}`,
    },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },

    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
  },
  {
    timestamps: true,
  }
);

const FactModel = mongoose.model<FactDocument>("Fact", factSchema);

export default FactModel;
