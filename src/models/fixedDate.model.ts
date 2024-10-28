import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface FixedDateInput {
  startDate: string;
  endDate: string;
  days: number;
  status: string;
  groupSize: string;
  expedition: ExpeditionDocument["_id"];
}

export interface FixedDateDocument extends FixedDateInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const fixedDateSchema = new mongoose.Schema(
  {
    fixedDateId: {
      type: String,
      required: true,
      unique: true,
      default: () => `fixed_date_${nanoid()}`,
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    days: { type: Number, required: true },
    status: { type: String, required: true },
    groupSize: { type: String, required: true },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
  },
  {
    timestamps: true,
  }
);

const FixedDateModel = mongoose.model<FixedDateDocument>("FixedDate", fixedDateSchema);

export default FixedDateModel;
