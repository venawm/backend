import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CollectionDocument } from "./collection.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CategoryInput {
  name: string;
  image?: string[];
  description?: string;
  collections: CollectionDocument["_id"];
  slug: string;
}

export interface CategoryDocument extends CategoryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `category_${nanoid()}`,
    },
    name: { type: String, required: true },
    image:  { type: Array(String)},
    description: { type: String },
    slug: { type: String ,unique:true,required:true},
    collections: { type: mongoose.Schema.Types.ObjectId, ref: "Collections" ,required:true},
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<CategoryDocument>("Category", CategorySchema);

export default CategoryModel;

