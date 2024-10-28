import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";
import { UserDocument } from "./user.model";
import { ActivityDocument } from "./activity.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ActivityBookingInput {
    fullName: string;
    phone: string;
    country: string;
    dob: string;
    email: string;
    arrivalDate?: string;
    departureDate?: string;
    activity: ActivityDocument["_id"];
    user?: UserDocument["_id"]
}

export interface ActivityBookingDocument extends ActivityBookingInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}


const ActivityBookingSchema = new mongoose.Schema(
    {
        activityBookingId: {
            type: String,
            required: true,
            unique: true,
            default: () => `activity_booking_${nanoid()}`,
        },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type:String, required: true },

        dob: { type: String, required: true },
        arrivalDate: { type: String},
        departureDate: { type: String },

        activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

const ActivityBookingModel = mongoose.model<ActivityBookingDocument>("ActivityBooking", ActivityBookingSchema);

export default ActivityBookingModel;
