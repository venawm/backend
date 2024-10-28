import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CostExcludeInput {
  order:number;
  title: string;
  description?: string;
  expedition: ExpeditionDocument["_id"];
 
}

export interface CostExcludeDocument extends CostExcludeInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const costExcludeSchema = new mongoose.Schema(
  {
    costExcludeId: {
      type: String,
      required: true,
      unique: true,
      default: () => `cost_exclude_${nanoid()}`,
    },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    description: { type: String },
  
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" ,required:true},
  },
  {
    timestamps: true,
  }
);

const CostExcludeModel = mongoose.model<CostExcludeDocument>("CostExclude", costExcludeSchema);

export default CostExcludeModel;
