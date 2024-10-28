

import { object, string, number, boolean, date, array, TypeOf } from "zod";

const payload = {
  body: object({
    fullName: string({
      required_error: "Full name is required",
    }),

    phone: string({
      required_error: "Phone number is required",
    }),

    country: string({
        required_error: "Country is required",
      }),

      email: string({
        required_error: "Email is required",
      }),

    dob: string({
      required_error: "Date of birth is required",
    }),

    arrivalDate: string().optional(),

    departureDate: string().optional(),

    training: string({
      required_error: "Training is required",
    }),

    user: string().optional(),
  }),
};

const params = {
  params: object({
    trainingBookingId: string({
      required_error: "Training Booking ID is required",
    }),
  }),
};

export const createTrainingBookingSchema = object({
  ...payload,
});

export const updateTrainingBookingSchema = object({
  ...payload,
  ...params,
});

export const deleteTrainingBookingSchema = object({
  ...params,
});

export const getTrainingBookingSchema = object({
  ...params,
});

export type CreateTrainingBookingInput = TypeOf<typeof createTrainingBookingSchema>;
export type UpdateTrainingBookingInput = TypeOf<typeof updateTrainingBookingSchema>;
export type ReadTrainingBookingInput = TypeOf<typeof getTrainingBookingSchema>;
export type DeleteTrainingBookingInput = TypeOf<typeof deleteTrainingBookingSchema>;
