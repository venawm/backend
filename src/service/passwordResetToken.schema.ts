import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PasswordResetTokenModel, { PasswordResetTokenDocument, PasswordResetTokenInput } from "../models/passwordResetToken.model";

export async function createPasswordResetToken(input: PasswordResetTokenInput) {
  const result = await PasswordResetTokenModel.create(input);
  return result;
}

export async function findPasswordResetToken(query: FilterQuery<PasswordResetTokenDocument>, options: QueryOptions = { lean: true }) {
  const result = await PasswordResetTokenModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdatePasswordResetToken(query: FilterQuery<PasswordResetTokenDocument>, update: UpdateQuery<PasswordResetTokenDocument>, options: QueryOptions) {
  return PasswordResetTokenModel.findOneAndUpdate(query, update, options);
}
