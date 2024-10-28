import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";
import { IternaryDocument } from "./iternary";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CostIncludeInput {
  title: string;
  description: string;
  order: number;
  expedition?: ExpeditionDocument["_id"];
  iternary?: IternaryDocument["_id"];
}

export interface CostIncludeDocument
  extends CostIncludeInput,
    mongoose.Document {
  costIncludeId: string;
  createdAt: Date;
  updatedAt: Date;
}

const costIncludeSchema = new mongoose.Schema(
  {
    costIncludeId: {
      type: String,
      required: true,
      unique: true,
      default: () => `costinclude_${nanoid()}`,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
    iternary: { type: mongoose.Schema.Types.ObjectId, ref: "Iternary" },
  },
  {
    timestamps: true,
  }
);

const CostIncludeModel = mongoose.model<CostIncludeDocument>(
  "CostInclude",
  costIncludeSchema
);

export default CostIncludeModel;
