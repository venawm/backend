import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "name is required",
    }),

    image: any(),
    
    description: string().optional(),

    slug: string(),

    collections: string({
      required_error: "collections is required",
    }),
  }),
};

const params = {
  params: object({
    categoryId: string({
      required_error: "categoryId is required",
    }),
  }),
};

const collectionParams = {
  params: object({
    collectionId: string({
      required_error: "collectionId is required",
    }),
  }),
};

export const createCategorySchema = object({
  ...payload,
});

export const updateCategorySchema = object({
  ...payload,
  ...params,
});

export const deleteCategorySchema = object({
  ...params,
});

export const getCategorySchema = object({
  ...params,
});

export const getCategoryFromCollectionSchema = object({
  ...collectionParams,
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type ReadCategoryInput = TypeOf<typeof getCategorySchema>;
export type ReadCategoryFromCollectionInput = TypeOf<typeof getCategoryFromCollectionSchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
