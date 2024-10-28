import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface FaqInput {
  title: string;
  description: string;
  expedition: ExpeditionDocument["_id"];
  order?: number
}

export interface FaqDocument extends FaqInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema:mongoose.Schema = new mongoose.Schema(
  {
    faqId: {
      type: String,
      required: true,
      unique: true,
      default: () => `faq_${nanoid()}`,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
    order: { type: Number, required:false }
  },
  {
    timestamps: true,
  }
);


faqSchema.pre("save", async function (next) {
  const faq = this as FaqDocument;

  if (!faq.order) {
    const lastFaq = await FaqModel.findOne({ expedition: faq.expedition })
      .sort({ order: -1 })
      .limit(1);

    faq.order = lastFaq ? (lastFaq.order!) + 1 : 1;
  }
  next();
});


const FaqModel = mongoose.model<FaqDocument>("Faq", faqSchema);

export default FaqModel;
