import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface TrainingInput {
  heading: string;
  title: string;
  thumbnail?: string;
  description: string;
  slug:string;
  
}

export interface TrainingDocument extends TrainingInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const trainingSchema = new mongoose.Schema(
  {
    trainingId: {
      type: String,
      required: true,
      unique: true,
      default: () => `training_${nanoid()}`,
    },
    heading: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String },
    description: { type: String, required: true },
    slug: { type: String, required: true },
  
  },
  {
    timestamps: true,
  }
);

const TrainingModel = mongoose.model<TrainingDocument>("Training", trainingSchema);

export default TrainingModel;
