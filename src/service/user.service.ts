import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { omit } from "lodash";
import bcrypt from "bcrypt";

export async function createUser(input: UserInput) {
  const user = await UserModel.create(input);
  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) {
  const result = await UserModel.findOne(query, {}, options).select("-password");
  return result;
}

export async function findManyUser(query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) {
  const result = await UserModel.find(query, {}, options).select("-password").sort({ createdAt: -1 });;
  return result;
}

export async function findAllUser(query: FilterQuery<UserDocument>) {
  const users = await UserModel.find(query).select("-password").sort({ createdAt: -1 });;
  return users;
}

export async function findAllUserExceptAdmin() {
  const users = await UserModel.find({role: { $nin: ['admin',"super-admin" ]} }).select("-password").sort({ createdAt: -1 });;
  return users;
}

export async function findAndUpdateUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) {
  return UserModel.findOneAndUpdate(query, update, options);
}

export async function deleteUser(query: FilterQuery<UserDocument>) {
  return UserModel.deleteOne(query);
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }

  // const isValid = await user.comparePassword(password);
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return false;
  return omit(user.toJSON(), "password");
}
