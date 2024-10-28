import { object, number, string, TypeOf, boolean } from "zod";

const payload = {
  body: object({
    email: string({
      required_error: "email is required",
    }),

    subject: string({
      required_error: "subject is required",
    }),

    message: string({
      required_error: "message is required",
    }),
  }),
};

const params = {
  params: object({
    mailId: string({
      required_error: "mailId is required",
    }),
  }),
};

export const createMailSchema = object({
  ...payload,
});

export const updateMailSchema = object({
  ...payload,
  ...params,
});

export const deleteMailSchema = object({
  ...params,
});

export const getMailSchema = object({
  ...params,
});

export type CreateMailInput = TypeOf<typeof createMailSchema>;
export type UpdateMailInput = TypeOf<typeof updateMailSchema>;
export type ReadMailInput = TypeOf<typeof getMailSchema>;
export type DeleteMailInput = TypeOf<typeof deleteMailSchema>;

//  Mail login
const loginPayload = {
  body: object({
    email: string({
      required_error: "email is required",
    }),

    password: string({
      required_error: "password is required",
    }),
  }),
};

export const loginMailSchema = object({
  ...loginPayload,
});

export type LoginMailInput = TypeOf<typeof loginMailSchema>;
