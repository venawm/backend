import { object, string, TypeOf, any, unknown } from "zod";

const payload = {
  body: object({
    media: string(),
    expedition: string({
      required_error: "expedition is required",
    }),
  }),
};

const params = {
  params: object({
    mediaId: string({
      required_error: "mediaId is required",
    }),
  }),
};

export const createMediaSchema = object({
  ...payload,
});

export const updateMediaSchema = object({
  ...payload,
  ...params,
});

export const deleteMediaSchema = object({
  ...params,
});

export const getMediaSchema = object({
  ...params,
});

export type CreateMediaInput = TypeOf<typeof createMediaSchema>;
export type UpdateMediaInput = TypeOf<typeof updateMediaSchema>;
export type ReadMediaInput = TypeOf<typeof getMediaSchema>;
export type DeleteMediaInput = TypeOf<typeof deleteMediaSchema>;
