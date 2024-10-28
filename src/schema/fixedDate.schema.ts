import { object, string, TypeOf, any, number } from "zod";

const payload = {
  body: object({
    startDate: string({
      required_error: "startDate is required",
    }),

    endDate: string({
      required_error: "endDate is required",
    }),

    days: number({
      required_error: "days is required",
    }),

    status: string({
      required_error: "status is required",
    }),

    groupSize: string({
      required_error: "groupSize is required",
    }),

    expedition: string({
      required_error: "expedition is required",
    }),
  }),
};

const params = {
  params: object({
    fixedDateId: string({
      required_error: "fixedDateId is required",
    }),
  }),
};

export const createFixedDateSchema = object({
  ...payload,
});

export const updateFixedDateSchema = object({
  ...payload,
  ...params,
});

export const deleteFixedDateSchema = object({
  ...params,
});

export const getFixedDateSchema = object({
  ...params,
});

export type CreateFixedDateInput = TypeOf<typeof createFixedDateSchema>;
export type UpdateFixedDateInput = TypeOf<typeof updateFixedDateSchema>;
export type ReadFixedDateInput = TypeOf<typeof getFixedDateSchema>;
export type DeleteFixedDateInput = TypeOf<typeof deleteFixedDateSchema>;
