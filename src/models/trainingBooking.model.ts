import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

import { UserDocument } from "./user.model";

import { TrainingDocument } from "./training.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface TrainingBookingInput {
    fullName: string;
    phone: string;
    country: string;
    dob: string;
    email: string;
    arrivalDate?: string;
    departureDate?: string;
    training: TrainingDocument["_id"];
    user?: UserDocument["_id"]
}

export interface TrainingBookingDocument extends TrainingBookingInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}


const TrainingBookingSchema = new mongoose.Schema(
    {
        trainingBookingId: {
            type: String,
            required: true,
            unique: true,
            default: () => `training_booking_${nanoid()}`,
        },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },

        dob: { type: String, required: true },
        arrivalDate: { type: String },
        departureDate: { type: String },

        training: { type: mongoose.Schema.Types.ObjectId, ref: "Training" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

const TrainingBookingModel = mongoose.model<TrainingBookingDocument>("TrainingBooking", TrainingBookingSchema);

export default TrainingBookingModel;
