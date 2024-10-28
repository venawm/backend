import { object, string, boolean, TypeOf } from "zod";

// Payload schema for the request body
const payload = {
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email format"),
    token: string({
      required_error: "Token is required",
    }),
    valid: boolean({
      required_error: "isValid is required",
    }).default(true),
  }),
};

// Params schema for URL parameters
const params = {
  params: object({
    passwordResetTokenId: string({
      required_error: "passwordResetTokenId is required",
    }),
  }),
};

// Create schema for creating a password reset token
export const createPasswordResetTokenSchema = object({
  ...payload,
});

// Update schema for updating a password reset token (uses params and payload)
export const updatePasswordResetTokenSchema = object({
  ...payload,
  ...params,
});

// Delete schema for deleting a password reset token (uses only params)
export const deletePasswordResetTokenSchema = object({
  ...params,
});

// Get schema for retrieving a password reset token by ID
export const getPasswordResetTokenSchema = object({
  ...params,
});

// Type definitions for input validation
export type CreatePasswordResetTokenInput = TypeOf<typeof createPasswordResetTokenSchema>;
export type UpdatePasswordResetTokenInput = TypeOf<typeof updatePasswordResetTokenSchema>;
export type ReadPasswordResetTokenInput = TypeOf<typeof getPasswordResetTokenSchema>;
export type DeletePasswordResetTokenInput = TypeOf<typeof deletePasswordResetTokenSchema>;
