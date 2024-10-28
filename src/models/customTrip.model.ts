import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";
import { UserDocument } from "./user.model";
import { Schema } from "mongoose";
import { ActivityDocument } from "./activity.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CustomTripInput {
    country:string;
    email: string;
    message?:string;
    fullName: string;
    phone: string;
    noOfTravelers: any;
    travelDate: any;
    location?: string;
    accomodation: string;
    budgetRange?: any;
    expedition: ExpeditionDocument["_id"];
    user: UserDocument["_id"];
   

}

export interface CustomTripDocument extends CustomTripInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const CustomTripSchema = new mongoose.Schema(
    {
        customTripId: {
            type: String,
            required: true,
            unique: true,
            default: () => `customTrip_${nanoid()}`,
        },

        noOfTravelers: { type: Schema.Types.Mixed, required: true },
        travelDate: { type: Schema.Types.Mixed, required: true },
        location: { type: String},
        expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition",required:true },
       
        accomodation: { type: String, required: true },
        budgetRange: { type: Schema.Types.Mixed },

        fullName: { type: String, required: true },
        phone: { type: String, required: true },

        country: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

const CustomTripModel = mongoose.model<CustomTripDocument>("CustomTrip", CustomTripSchema);

export default CustomTripModel;
