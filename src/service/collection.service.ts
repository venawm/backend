import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CollectionModel, {
  CollectionDocument,
  CollectionInput,
} from "../models/collection.model";

export async function createCollection(input: CollectionInput) {
  const result = await CollectionModel.create(input);
  return result;
}

export async function findCollection(
  query: FilterQuery<CollectionDocument>,
  options: QueryOptions = { lean: true }
) {
  const result = await CollectionModel.findOne(query, {}, options).sort({
    createdAt: -1,
  });
  return result;
}

export async function findAndUpdateCollection(
  query: FilterQuery<CollectionDocument>,
  update: UpdateQuery<CollectionDocument>,
  options: QueryOptions
) {
  return CollectionModel.findOneAndUpdate(query, update, options).sort({
    createdAt: -1,
  });
}

export async function deleteCollection(query: FilterQuery<CollectionDocument>) {
  return CollectionModel.deleteOne(query);
}

export async function findAllCollection(
  select: string,
  filter: any = {},
  sortOptions: any = {},
  p0: string
) {
  try {
    console.log(filter, select, sortOptions);
    const result = await CollectionModel.find(filter)
      .select(select)
      .sort(sortOptions)
      .exec();
    return result;
  } catch (error: any) {
    throw new Error("Error fetching collections: " + error.message);
  }
}
