import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    fieldName: string({
      required_error: "Field name is required",
    }),

    price: number({
      required_error: "Price is required",
    }),
description:string().optional()
  
  }),
};

const params = {
  params: object({
    addOnId: string({
      required_error: "addOnId is required",
    }),
  }),
};

export const createAddOnSchema = object({
  ...payload,
});

export const updateAddOnSchema = object({
  ...payload,
  ...params,
});

export const deleteAddOnSchema = object({
  ...params,
});

export const getAddOnSchema = object({
  ...params,
});

export type CreateAddOnInput = TypeOf<typeof createAddOnSchema>;
export type UpdateAddOnInput = TypeOf<typeof updateAddOnSchema>;
export type ReadAddOnInput = TypeOf<typeof getAddOnSchema>;
export type DeleteAddOnInput = TypeOf<typeof deleteAddOnSchema>;
