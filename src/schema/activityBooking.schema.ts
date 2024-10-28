

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

    dob:string({
      required_error: "Date of birth is required",
    }),

    arrivalDate: string().optional(),

    departureDate: string().optional(),

    activity: string({
      required_error: "Activity is required",
    }),

    user: string().optional(),
  }),
};

const params = {
  params: object({
    activityBookingId: string({
      required_error: "Activity Booking ID is required",
    }),
  }),
};

export const createActivityBookingSchema = object({
  ...payload,
});

export const updateActivityBookingSchema = object({
  ...payload,
  ...params,
});

export const deleteActivityBookingSchema = object({
  ...params,
});

export const getActivityBookingSchema = object({
  ...params,
});

export type CreateActivityBookingInput = TypeOf<typeof createActivityBookingSchema>;
export type UpdateActivityBookingInput = TypeOf<typeof updateActivityBookingSchema>;
export type ReadActivityBookingInput = TypeOf<typeof getActivityBookingSchema>;
export type DeleteActivityBookingInput = TypeOf<typeof deleteActivityBookingSchema>;
