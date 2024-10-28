import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "name is required",
    }),

    description: string({
      required_error: "description is required",
    }),

    banner:string(),
    slug: string({
      required_error: "slug is required",
    }),
    price:number(),
    previousPrice:number()
  }),
};

const params = {
  params: object({
    activityId: string({
      required_error: "activityId is required",
    }),
  }),
};

export const createActivitySchema = object({
  ...payload,
});

export const updateActivitySchema = object({
  ...payload,
  ...params,
});

export const deleteActivitySchema = object({
  ...params,
});

export const getActivitySchema = object({
  ...params,
});

export type CreateActivityInput = TypeOf<typeof createActivitySchema>;
export type UpdateActivityInput = TypeOf<typeof updateActivitySchema>;
export type ReadActivityInput = TypeOf<typeof getActivitySchema>;
export type DeleteActivityInput = TypeOf<typeof deleteActivitySchema>;
