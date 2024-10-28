import { object, number, string, TypeOf, any, boolean, date } from "zod";


const payload = {
  body: object({
    startDate:date({
      required_error: "Start date  is required",
    }),
    endDate: date({
      required_error: "End date is required",
    }),

   

    duration: number({
      required_error: "Duration is required",
    }),

    price: number().optional(),
    expedition: string({
      required_error: "expedition is required",
    }),
  }),
};

const params = {
  params: object({
    privateDepartureId: string({
      required_error: "privateDepartureId is required",
    }),
  }),
};



export const createPrivateDepartureSchema = object({
  ...payload,
});

export const updatePrivateDepartureSchema = object({
  ...payload,
  ...params,
});

export const deletePrivateDepartureSchema = object({
  ...params,
});

export const getPrivateDepartureSchema = object({
  ...params,
});




export type CreatePrivateDepartureInput = TypeOf<typeof createPrivateDepartureSchema>;
export type UpdatePrivateDepartureInput = TypeOf<typeof updatePrivateDepartureSchema>;

export type ReadPrivateDepartureInput = TypeOf<typeof getPrivateDepartureSchema>;
export type DeletePrivateDepartureInput = TypeOf<typeof deletePrivateDepartureSchema>;
