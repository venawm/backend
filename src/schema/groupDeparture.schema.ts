import { object, number, string, TypeOf, any, boolean, date } from "zod";


const payload = {
  body: object({
    startDate: date({
      required_error: "Start date  is required",
    }),
    endDate: date({
      required_error: "End date is required",
    }),
    price: number().optional(),
    duration: number({
      required_error: "Price is required",
    }),
    totalQuantity: number({
      required_error: "total quantity is required",
    }),

    minQuantity: number({
      required_error: "total quantity is required",
    }),

    soldQuantity: number({
      required_error: "sold quantity is required",
    }),
    expedition: string({
      required_error: "expedition is required",
    }),
  })
  .refine((data) => data.soldQuantity <= data.totalQuantity, {
    message: "Sold quantity cannot exceed total quantity",
    path: ["soldQuantity"],
  }),
};

const params = {
  params: object({
    groupDepartureId: string({
      required_error: "groupDepartureId is required",
    }),
  }),
};



export const createGroupDepartureSchema = object({
  ...payload,
});

export const updateGroupDepartureSchema = object({
  ...payload,
  ...params,
});

export const deleteGroupDepartureSchema = object({
  ...params,
});

export const getGroupDepartureSchema = object({
  ...params,
});




export type CreateGroupDepartureInput = TypeOf<typeof createGroupDepartureSchema>;
export type UpdateGroupDepartureInput = TypeOf<typeof updateGroupDepartureSchema>;

export type ReadGroupDepartureInput = TypeOf<typeof getGroupDepartureSchema>;
export type DeleteGroupDepartureInput = TypeOf<typeof deleteGroupDepartureSchema>;
