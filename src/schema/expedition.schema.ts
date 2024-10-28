import { object, number, string, TypeOf, any, boolean } from "zod";

const typeEnum = string().refine((value) => value === "trekking" || value === "expedition", {
  message: "Type must be 'trekking' or 'expedition'",
});
const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    slug: string({
      required_error: "Slug is required",
    }),
    subheading: string({
      required_error: "subheading is required",
    }),

    tripcode: string({
      required_error: "tripcode is required",
    }),

    overview: string({
      required_error: "overview is required",
    }),

    category: string({
      required_error: "category is required",
    }),

    collections: string({
      required_error: "collections is required",
    }),
    routeMap: any(),
    banner: any(),

    region:string().optional(),

    mealsIncluded:string().optional(),
       
    transportation:string().optional(),
    startPoint:string().optional(),
    endPoint:string().optional(),
    essentialInformation:string().optional(),
    // winter: string().optional(),
    // autumn: string().optional(),
    // summer: string().optional(),
    // spring: string().optional(),


    // maxElevation: string({
    //   required_error: "maxElevation is required",
    // }),
    // walkingPerDay: string({
    //   required_error: "walkingPerDay is required",
    // }),
    // accomodation: string({
    //   required_error: "accomodation is required",
    // }),
    // bestSeason: string({
    //   required_error: "bestSeason is required",
    // }),
    // groupSize: string({
    //   required_error: "groupSize is required",
    // }),

    // description: string({
    //   required_error: "description is required",
    // }),
    // duration: string({
    //   required_error: "duration is required",
    // }),
    // activity: string({
    //   required_error: "activity is required",
    // }),
    // physical: string({
    //   required_error: "physical is required",
    // }),

    // age: string({
    //   required_error: "age is required",
    // }),
    // location: string({
    //   required_error: "location is required",
    // }),

  // meter: string({
    //   required_error: "meter is required",
    // }),

    // country: string({
    //   required_error: "country is required",
    // }),

    // displayMeter: string({
    //   required_error: "displayMeter is required",
    // }),
    type: typeEnum,

    // isUpcoming: string({
    //   required_error: "isUpcoming is required",
    // }),
  }),
};

const params = {
  params: object({
    expeditionId: string({
      required_error: "expeditionId is required",
    }),
  }),
};

const fromCollectionparams = {
  params: object({
    collectionId: string({
      required_error: "collectionId is required",
    }),
  }),
};

const fromCategoryparams = {
  params: object({
    categoryId: string({
      required_error: "categoryId is required",
    }),
  }),
};

export const createExpeditionSchema = object({
  ...payload,
});

export const updateExpeditionSchema = object({
  ...payload,
  ...params,
});

export const deleteExpeditionSchema = object({
  ...params,
});

export const getExpeditionSchema = object({
  ...params,
});

export const getExpeditionFromCategorySchema = object({
  ...fromCategoryparams,
});

export const getExpeditionFromCollectionSchema = object({
  ...fromCollectionparams,
});


export type CreateExpeditionInput = TypeOf<typeof createExpeditionSchema>;
export type UpdateExpeditionInput = TypeOf<typeof updateExpeditionSchema>;
export type findExpeditionFromCategoryInput = TypeOf<typeof getExpeditionFromCategorySchema>;
export type findExpeditionFromCollectionInput = TypeOf<typeof getExpeditionFromCollectionSchema>;
export type ReadExpeditionInput = TypeOf<typeof getExpeditionSchema>;
export type DeleteExpeditionInput = TypeOf<typeof deleteExpeditionSchema>;
