import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { boolean } from "zod";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface UserInput {
  email: string;
  password: string;
  verifyToken?: string;
  isVerified?: boolean;
  role?: string;
  userId?: string;

  coverPic?:string;

  profile?: string;
  firstName?:string;
  middleName?: string;
  lastName?: string;
  phoneNumber?:string;
  gender?: string;
  priceRange?: string;
  dob?:string;

  availability?:[
    {
      startDate?:Date;
      endDate?:Date;
    }
  ];

}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      default: () => `user_${nanoid()}`,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyToken: { type: String },
   
    firstName:{type: String},
    middleName:{type:String},
    lastName:{type:String},
    phoneNumber: { type: String },
    dob:{type:String},
    gender:{type:String},
    availability:[
      {
        startDate:{type:Date},
        endDate:{type:Date}
      }
    ],

    profile: { type: String },
    coverPic: { type: String },
    isVerified: { type: Boolean, required: true, default: false },
    role: { type: String, required: true, enum: ["super-admin","admin", "user","porter","cook","expedition-guide","trekking-guide"], default: "user" },
    priceRange:{type:String},


  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
