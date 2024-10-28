import { object, number, string, TypeOf, any } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "title is required",
    }),

    slug: string({
      required_error: "Slug is required",
    }),

    banner: string({
      required_error: "Banner is required",
    }),

    description: string({
      required_error: "description is required",
    }),
  }),
};

const params = {
  params: object({
    blogId: string({
      required_error: "blogId is required",
    }),
  }),
};

export const createBlogSchema = object({
  ...payload,
});

export const updateBlogSchema = object({
  ...payload,
  ...params,
});

export const deleteBlogSchema = object({
  ...params,
});

export const getBlogSchema = object({
  ...params,
});

export type CreateBlogInput = TypeOf<typeof createBlogSchema>;
export type UpdateBlogInput = TypeOf<typeof updateBlogSchema>;
export type ReadBlogInput = TypeOf<typeof getBlogSchema>;
export type DeleteBlogInput = TypeOf<typeof deleteBlogSchema>;
