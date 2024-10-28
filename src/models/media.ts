import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface MediaInput {
  media: string;
  expedition: ExpeditionDocument["_id"];
}

export interface MediaDocument extends MediaInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new mongoose.Schema(
  {
    mediaId: {
      type: String,
      required: true,
      unique: true,
      default: () => `media_${nanoid()}`,
    },
    media: { type: String, required: true },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
  },
  {
    timestamps: true,
  }
);

const MediaModel = mongoose.model<MediaDocument>("Media", mediaSchema);

export default MediaModel;
