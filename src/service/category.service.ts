import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CategoryModel, {
  CategoryDocument,
  CategoryInput,
} from "../models/category.model";
import ExpeditionModel from "../models/expedition";

export async function createCategory(input: CategoryInput) {
  const result = await CategoryModel.create(input);
  return result;
}

export async function findCategory(
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true }
) {
  const result = await CategoryModel.findOne(query, {}, options).populate(
    "collections"
  );
  return result;
}

export async function findManyCategory(
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true }
) {
  const result = await CategoryModel.find(query, {}, options).populate(
    "collections"
  );
  return result;
}

export async function findAndUpdateCategory(
  query: FilterQuery<CategoryDocument>,
  update: UpdateQuery<CategoryDocument>,
  options: QueryOptions
) {
  return CategoryModel.findOneAndUpdate(query, update, options).populate(
    "collections"
  );
}

export async function deleteCategory(query: FilterQuery<CategoryDocument>) {
  return CategoryModel.deleteOne(query);
}
export async function findAllCategory() {
  try {
    // Fetch all categories and populate the collections field
    const categories = await CategoryModel.find()
      .populate("collections")
      .sort({ createdAt: -1 });

    // Embed expeditions into their respective categories
    const populatedCategories = await Promise.all(
      categories.map(async (category) => {
        // Fetch expeditions where the category ID matches
        const expeditions = await ExpeditionModel.find({
          category: category._id, // Ensure correct field for category reference
        });

        // Return category with expeditions embedded
        return {
          ...category.toObject(),
          expeditions,
        };
      })
    );

    return populatedCategories;
  } catch (error) {
    console.error("Error fetching categories and expeditions", error);
    throw new Error("Error fetching categories and expeditions");
  }
}
