import { object, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    fullName: string({
      required_error: "fullName is required",
    }),

    email: string({
      required_error: "email is required",
    }),

    address: string({
      required_error: "address is required",
    }),
    phoneNo: string({
      required_error: "phone number is required",
    }),
    message: string({
      required_error: "message is required",
    }),
  }),
};

const params = {
  params: object({
    inquiryId: string({
      required_error: "inquiryId is required",
    }),
  }),
};

export const createInquirySchema = object({
  ...payload,
});

export const updateInquirySchema = object({
  ...payload,
  ...params,
});

export const deleteInquirySchema = object({
  ...params,
});

export const getInquirySchema = object({
  ...params,
});

export type CreateInquiryInput = TypeOf<typeof createInquirySchema>;
export type UpdateInquiryInput = TypeOf<typeof updateInquirySchema>;
export type ReadInquiryInput = TypeOf<typeof getInquirySchema>;
export type DeleteInquiryInput = TypeOf<typeof deleteInquirySchema>;
