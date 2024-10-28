import { object, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "title is required",
    }),

    shortDescription: string({
      required_error: "description is required",
    }),

    image: string(
      {
        required_error: "image is required",
      }
    ),

    documents:string(
      {
        required_error: "documents is required",
      }
    ),

    expedition: string({
      required_error: "expedition is required",
    }),
  }),
};

const params = {
  params: object({
    valueAdditionId: string({
      required_error: "valueAdditionId is required",
    }),
  }),
};

export const createValueAdditionSchema = object({
  ...payload,
});

export const updateValueAdditionSchema = object({
  ...payload,
  ...params,
});

export const deleteValueAdditionSchema = object({
  ...params,
});

export const getValueAdditionSchema = object({
  ...params,
});

export type CreateValueAdditionInput = TypeOf<typeof createValueAdditionSchema>;
export type UpdateValueAdditionInput = TypeOf<typeof updateValueAdditionSchema>;
export type ReadValueAdditionInput = TypeOf<typeof getValueAdditionSchema>;
export type DeleteValueAdditionInput = TypeOf<typeof deleteValueAdditionSchema>;
