import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface PasswordResetTokenInput {
  email: string;
  token: string;
  valid: boolean;

}

export interface PasswordResetTokenDocument extends PasswordResetTokenInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const passwordResetTokenSchema = new mongoose.Schema(
  {
    passwordResetTokenId: {
      type: String,
      required: true,
      unique: true,
      default: () => `password_reset_token_${nanoid()}`,
    },
    email: { type: String, required: true },
    token: { type: String, required: true },
    valid: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const PasswordResetTokenModel = mongoose.model<PasswordResetTokenDocument>("PasswordResetToken", passwordResetTokenSchema);

export default PasswordResetTokenModel;
