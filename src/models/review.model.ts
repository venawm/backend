import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ReviewInput {
  message?: string;
  rating: number;
  like?: number;
  isVerified?:boolean;
  user: UserDocument["_id"];
  name:string;
  email:string;
  expedition: ExpeditionDocument["_id"];
}

export interface Review extends ReviewInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    reviewId: {
      type: String,
      required: true,
      unique: true,
      default: () => `review_${nanoid()}`,
    },
    message: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
    rating: { type: Number, required: true },
    isVerified: { type: Boolean, default:false },
    like:{ type: Number},
    images: { type: Array(String)},

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model<Review>("Review", reviewSchema);

export default ReviewModel;
