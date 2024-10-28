import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface InquiryInput {
  fullName: string;
  email: string;
  address: string;
  phoneNo:string;
  message: string;
}

export interface InquiryDocument extends InquiryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new mongoose.Schema(
  {
    inquiryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `inquiry_${nanoid()}`,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const InquiryModel = mongoose.model<InquiryDocument>("Inquiry", inquirySchema);

export default InquiryModel;
