import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CollectionInput {
  name: string;
  image?: string[];
  description?: string;
  slug: string;
  showInHomePage?:boolean;
}

export interface CollectionDocument extends CollectionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new mongoose.Schema(
  {
    collectionId: {
      type: String,
      required: true,
      unique: true,
      default: () => `collection_${nanoid()}`,
    },
    name: { type: String, required: true },
    image: { type: Array(String)},
    slug: { type: String,unique:true,required:true},
    description: { type: String},
    showInHomePage: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const CollectionModel = mongoose.model<CollectionDocument>("Collections", CollectionSchema);

export default CollectionModel;
