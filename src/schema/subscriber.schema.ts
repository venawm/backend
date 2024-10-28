import { object, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    image: any(),
    email: string({
      required_error: "Email is required",
    }),
  }),
};

const params = {
  params: object({
    subscriberId: string({
      required_error: "subscriberId is required",
    }),
  }),
};

export const createSubscriberSchema = object({
  ...payload,
});

export const updateSubscriberSchema = object({
  ...payload,
  ...params,
});

export const deleteSubscriberSchema = object({
  ...params,
});

export const getSubscriberSchema = object({
  ...params,
});

export type CreateSubscriberInput = TypeOf<typeof createSubscriberSchema>;
export type UpdateSubscriberInput = TypeOf<typeof updateSubscriberSchema>;
export type ReadSubscriberInput = TypeOf<typeof getSubscriberSchema>;
export type DeleteSubscriberInput = TypeOf<typeof deleteSubscriberSchema>;
