import { object, string, TypeOf, any } from "zod";

const payload = {
    body: object({
        title: string({
            required_error: "title is required",
        }),
        icon: string({
            required_error: "icon is required",
        }),
        description: string({
            required_error: "description is required",
        }),

        expedition: string({
            required_error: "expedition is required",
        }),
    }),
};

const params = {
    params: object({
        factId: string({
            required_error: "factId is required",
        }),
    }),
};

export const createFactSchema = object({
    ...payload,
});

export const updateFactSchema = object({
    ...payload,
    ...params,
});

export const deleteFactSchema = object({
    ...params,
});

export const getFactSchema = object({
    ...params,
});

export type CreateFactInput = TypeOf<typeof createFactSchema>;
export type UpdateFactInput = TypeOf<typeof updateFactSchema>;
export type ReadFactInput = TypeOf<typeof getFactSchema>;
export type DeleteFactInput = TypeOf<typeof deleteFactSchema>;
