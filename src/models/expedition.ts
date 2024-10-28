import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CollectionDocument } from "./collection.model";
import { CategoryDocument } from "./category.model";
import { any } from "zod";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ExpeditionInput {
  name: string;
  subheading?: string;
  tripcode?: string;
  overview?: string;
  banner?: string;
  collections: CollectionDocument["_id"];
  category: CategoryDocument["_id"];
  slug: string;
  routeMap?: string;
  gearList?: string;
  equipmentList?: string;
  season?: string;
  maxElevation?: string;
  accomodation?: string;
  duration?: number;
  physical?: string;
  activity?: string;
  groupSize?: string;
  coordinates?: string;
  mountainRange?: string;
  promoCode?: {
    code?: string;
    percentage?: number;

    isActive?: boolean;
    expiration?: Date;
  };
  price?: {
    adult?: {
      pricePerAdult?: number;
      discountsA?: [
        {
          minQuantity?: number;
          maxQuantity?: number;
          price?: number;
        }
      ];
    };
    children?: {
      pricePerChildren?: number;
      discountsC?: [
        {
          minQuantity?: number;
          maxQuantity?: number;
          price?: number;
        }
      ];
    };
  };

  isUpcoming?: boolean;
  isBestseller?: boolean;
  showInHero?: boolean;
  isFromOldSite?: boolean;
  isPublished?: boolean;
  region?: String;

  mealsIncluded?: String;

  transportation?: String;
  startPoint?: String;
  endPoint?: String;
  essentialInformation?: String;
  // addons will be array of object
  addons?: {
    fieldName: string;
    price: number;
  }[];
}

export interface ExpeditionDocument extends ExpeditionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const expeditionSchema = new mongoose.Schema(
  {
    expeditionId: {
      type: String,
      required: true,
      unique: true,
      default: () => `expedition_${nanoid()}`,
    },
    name: { type: String, required: true },
    subheading: { type: String },
    tripcode: { type: String },
    overview: { type: String },
    season: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    collections: { type: mongoose.Schema.Types.ObjectId, ref: "Collections", required: true },
    banner: { type: String },
    routeMap: { type: String },
    gearList: { type: String },
    equipmentList: { type: String },
    slug: { type: String, unique: true, required: true },
    maxElevation: { type: String },
    coordinates: { type: String },
    mountainRange: { type: String },
    essentialInformation: { type: String },
    duration: { type: Number },

    region: { type: String },

    mealsIncluded: { type: String },

    transportation: { type: String },
    startPoint: { type: String },
    endPoint: { type: String },
    accomodation: { type: String },

    groupSize: { type: String },

    activity: { type: String },
    physical: { type: String },

    promoCode: {
      code: { type: String },
      percentage: { type: Number },

      isActive: { type: Boolean },
      expiration: { type: Date },
    },
    price: {
      adult: {
        pricePerAdult: { type: Number },
        discountsA: [
          {
            minQuantity: { type: Number },
            maxQuantity: { type: Number },
            price: { type: Number },
          },
        ],
      },
      children: {
        pricePerChildren: { type: Number },
        discountsC: [
          {
            minQuantity: { type: Number },
            maxQuantity: { type: Number },
            price: { type: Number },
          },
        ],
      },
    },

    isUpcoming: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    showInHero: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    isFromOldSite: { type: Boolean, default: false },
    addons: [
      {
        fieldName: { type: String },
        price: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ExpeditionModel = mongoose.model<ExpeditionDocument>("Expedition", expeditionSchema);

export default ExpeditionModel;
