import { object, number, string, TypeOf, any, optional, boolean, date } from "zod";

const payload = {
  body: object({
    fullName: string({
      required_error: "fullName is required",
    }),
    email: string({
      required_error: "email is required",
    }),
    phone:string({
      required_error: "Participant phone no  is required",
    }),
    message: string().optional(),
    expedition: string().optional(),
    activity: string().optional(),

    country:string(),
   
    noOfTravelers: any(),
    travelDate: any(),
    location: string(),
    accomodation: string(),
    budgetRange: any(),
   
  }),
};

const params = {
  params: object({
    customTripId: string({
      required_error: "customTripId is required",
    }),
  }),
};

export const createCustomTripSchema = object({
  ...payload,
});

export const updateCustomTripSchema = object({
  ...payload,
  ...params,
});

export const deleteCustomTripSchema = object({
  ...params,
});

export const getCustomTripSchema = object({
  ...params,
});

export type CreateCustomTripInput = TypeOf<typeof createCustomTripSchema>;
export type UpdateCustomTripInput = TypeOf<typeof updateCustomTripSchema>;
export type ReadCustomTripInput = TypeOf<typeof getCustomTripSchema>;
export type DeleteCustomTripInput = TypeOf<typeof deleteCustomTripSchema>;
