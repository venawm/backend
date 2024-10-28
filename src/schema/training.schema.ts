import { object, string, TypeOf, any, boolean, number } from "zod";

const payload = {
  body: object({
    heading: string({
      required_error: "Heading is required",
    }),

    thumbnail: any(),

    title: string({
      required_error: "Title is required",
    }),

    description: string({
      required_error: "description is required",
    }),

    slug: string({
      required_error: "Slug is required",
    }),


  }),
};

const params = {
  params: object({
    trainingId: string({
      required_error: "trainingId is required",
    }),
  }),
};

export const createTrainingSchema = object({
  ...payload,
});

export const updateTrainingSchema = object({
  ...payload,
  ...params,
});

export const deleteTrainingSchema = object({
  ...params,
});

export const getTrainingSchema = object({
  ...params,
});

export type CreateTrainingInput = TypeOf<typeof createTrainingSchema>;
export type UpdateTrainingInput = TypeOf<typeof updateTrainingSchema>;
export type ReadTrainingInput = TypeOf<typeof getTrainingSchema>;
export type DeleteTrainingInput = TypeOf<typeof deleteTrainingSchema>;
