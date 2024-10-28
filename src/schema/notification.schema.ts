import { object, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
  }),
};

const params = {
  params: object({
    notificationId: string({
      required_error: "notificationId is required",
    }),
  }),
};

export const createNotificationSchema = object({
  ...payload,
});

export const updateNotificationSchema = object({
  ...payload,
  ...params,
});

export const deleteNotificationSchema = object({
  ...params,
});

export const getNotificationSchema = object({
  ...params,
});

export type CreateNotificationInput = TypeOf<typeof createNotificationSchema>;
export type UpdateNotificationInput = TypeOf<typeof updateNotificationSchema>;
export type ReadNotificationInput = TypeOf<typeof getNotificationSchema>;
export type DeleteNotificationInput = TypeOf<typeof deleteNotificationSchema>;
