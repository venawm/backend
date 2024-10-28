import { object, number, string, TypeOf, boolean } from "zod";

const payload = {
  body: object({
    email: string({
      required_error: "email is required",
    }),

    password: string({
      required_error: "password is required",
    }),
  }),
};

const params = {
  params: object({
    userId: string({
      required_error: "userId is required",
    }),
  }),
};

export const createUserSchema = object({
  ...payload,
});

export const updateUserSchema = object({

  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const getUserSchema = object({
  ...params,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type ReadUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;

//  User login
const loginPayload = {
  body: object({
    email: string({
      required_error: "Email is required",
    }),

    password: string({
      required_error: "Password is required",
    }),
  }),
};

export const loginUserSchema = object({
  ...loginPayload,
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
