import { object, string, TypeOf, any, number } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "title is required",
    }),

    description: string({
      required_error: "description is required",
    }),

    expedition: string({
      required_error: "expedition is required",
    }),
    order:number({
      required_error:"order is required"
  })
  }),
};

const params = {
  params: object({
    costExcludeId: string({
      required_error: "costExcludeId is required",
    }),
  }),
};

export const createCostExcludeSchema = object({
  ...payload,
});

export const updateCostExcludeSchema = object({
  ...payload,
  ...params,
});

export const deleteCostExcludeSchema = object({
  ...params,
});

export const getCostExcludeSchema = object({
  ...params,
});

export type CreateCostExcludeInput = TypeOf<typeof createCostExcludeSchema>;
export type UpdateCostExcludeInput = TypeOf<typeof updateCostExcludeSchema>;
export type ReadCostExcludeInput = TypeOf<typeof getCostExcludeSchema>;
export type DeleteCostExcludeInput = TypeOf<typeof deleteCostExcludeSchema>;
