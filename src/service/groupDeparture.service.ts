import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import GroupDepartureModel, { GroupDepartureDocument, GroupDepartureInput } from "../models/groupDeparture.model";

export async function createGroupDeparture(input: GroupDepartureInput) {
  const result = await GroupDepartureModel.create(input);
  return result;
}

export async function findGroupDeparture(query: FilterQuery<GroupDepartureDocument>, options: QueryOptions = { lean: true }) {
  const result = await GroupDepartureModel.findOne(query, {}, options)
  return result;
}

export async function findAndUpdateGroupDeparture(query: FilterQuery<GroupDepartureDocument>, update: UpdateQuery<GroupDepartureDocument>, options: QueryOptions) {
  return GroupDepartureModel.findOneAndUpdate(query, update, options)
}

export async function deleteGroupDeparture(query: FilterQuery<GroupDepartureDocument>) {
  return GroupDepartureModel.deleteOne(query);
}

export async function findAllGroupDeparture() {
  const result = await GroupDepartureModel.find()
  return result;
}

export async function findGroupDepartureByExpedition(query: FilterQuery<GroupDepartureDocument>, options: QueryOptions = { lean: true }) {
  const result = await GroupDepartureModel.find(query, {}, options);
  return result;
}
export async function deleteManyGroupDeparture(query: FilterQuery<GroupDepartureDocument>) {
  return GroupDepartureModel.deleteMany(query);
}
