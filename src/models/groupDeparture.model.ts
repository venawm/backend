import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CollectionDocument } from "./collection.model";
import { CategoryDocument } from "./category.model";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface GroupDepartureInput {
    startDate: Date;
    endDate: Date;
    duration:number;
    price?: number;
   
    totalQuantity: number;
    minQuantity: number;
    soldQuantity: number;
    expedition: ExpeditionDocument["_id"];
}

export interface GroupDepartureDocument extends GroupDepartureInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const GroupDepartureSchema = new mongoose.Schema(
    {
        groupDepartureId: {
            type: String,
            required: true,
            unique: true,
            default: () => `groupDeparture_${nanoid()}`,
        },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        duration: { type: Number , required: true},
        price: { type: Number},
      
        totalQuantity: { type:Number, required: true },
        minQuantity: { type:Number, required: true },
        soldQuantity: { type:Number, required: true },
        expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
    },
    {
        timestamps: true,
    }
);

const GroupDepartureModel = mongoose.model<GroupDepartureDocument>("GroupDeparture", GroupDepartureSchema);

export default GroupDepartureModel;
