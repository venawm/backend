import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "name is required",
    }),
    slug: string({
      required_error: "slug is required",
    }),
  }),
};

const params = {
  params: object({
    collectionId: string({
      required_error: "collectionId is required",
    }),
  }),
};

export const createCollectionSchema = object({
  ...payload,
});

export const updateCollectionSchema = object({
  ...payload,
  ...params,
});

export const deleteCollectionSchema = object({
  ...params,
});

export const getCollectionSchema = object({
  ...params,
});

export type CreateCollectionInput = TypeOf<typeof createCollectionSchema>;
export type UpdateCollectionInput = TypeOf<typeof updateCollectionSchema>;
export type ReadCollectionInput = TypeOf<typeof getCollectionSchema>;
export type DeleteCollectionInput = TypeOf<typeof deleteCollectionSchema>;
