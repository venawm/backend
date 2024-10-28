import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express"; // Add this import if using TypeScript

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contour Expeditions API Documentation",
      version: "1.0.0",
      description: "API documentation for Contour Expeditions backend",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {

        Activity: {
          type: "object",
          required: ["name", "description", "slug", "banner"],
          properties: {
            name: {
              type: "string",
              description: "Name of the activity",
            },
            slug: {
              type: "string",
              description: "URL-friendly identifier for the activity",
            },
            description: {
              type: "string",
              description: "Description of the activity",
            },
            banner: {
              type: "string",
              description: "URL of the banner image",
            },
            images: {
              type: "array",
              items: {
                type: "string",
                description: "Array of image URLs for the activity",
              },
            },
          },
        },


        // Add more schemas here
        Blog: {
          type: "object",
          required: ["title", "slug", "description"],
          properties: {
            blogId: {
              type: "string",
              description: "Unique identifier for the blog",
            },
            title: {
              type: "string",
              description: "Name of the add on",
            },
            slug: {
              type: "string",
              description: "URL-friendly identifier for the blog",
            },
            description: {
              type: "string",
              description: "Description of blog",
            },
            banner: {
              type: "string",
              description: "Banner of blog",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },

        Category: {
          type: "object",
          required: ["name", "slug", "collections"],
          properties: {
            categoryId: {
              type: "string",
              description: "Unique identifier for the category",
            },
            name: {
              type: "string",
              description: "Name of category",
            },
            slug: {
              type: "string",
              description: "URL-friendly identifier for the category",
            },
            description: {
              type: "string",
              description: "Description of category",
            },
            image: {
              type: "array",
              items: {
                type: "string",
                description: "image URL for the category",
              }
            },
            collections: {
              type: "string",
              description: "Collection Object Id of collection it belongs to",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Collections: {
          type: "object",
          required: ["name", "slug"],
          properties: {
            collectionId: {
              type: "string",
              description: "Unique identifier for the collection",
            },
            name: {
              type: "string",
              description: "Name of collection",
            },
            slug: {
              type: "string",
              description: "URL-friendly identifier for the collection",
            },
            description: {
              type: "string",
              description: "Description of collection",
            },
            image: {
              type: "array",
              items: {
                type: "string",
                description: "Image URL for the collection",
              }
            },
            showInHomePage: {
              type: "boolean",
              default: false,
              description: "Whether to show any collection in home page"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        CostExclude: {
          type: "object",
          required: ["title", "expedition", "order"],
          properties: {
            costExcludeId: {
              type: "string",
              description: "Unique identifier for the cost exclude",
            },
            title: {
              type: "string",
              description: "Title of cost exclude",
            },
            order: {
              type: "number",
              description: "Order of cost exclude",
            },

            description: {
              type: "string",
              description: "Description of cost exclude",
            },
            expedition: {
              type: "string",
              description: "Expedition object id of expedition it refers to",
            },


            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        CostInclude: {
          type: "object",
          required: ["title", "expedition", "order"],
          properties: {
            costIncludeId: {
              type: "string",
              description: "Unique identifier for the cost include",
            },
            order: {
              type: "number",
              description: "Order of cost exclude",
            },
            title: {
              type: "string",
              description: "Title of cost include",
            },

            description: {
              type: "string",
              description: "Description of cost include",
            },
            expedition: {
              type: "string",
              description: "Expedition object id of expedition it refers to",
            },


            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Expedition: {
          type: "object",
          required: ["name", "slug", "collections", "category"],
          properties: {
            expeditionId: {
              type: "string",
              description: "Unique identifier for the expedition"

            },

            name: {
              type: "string",
              description: "Name of the expedition"
            },
            mountainRange: {
              type: "string",
              description: "Mountain range of the expedition"
            },

            coordinates: {
              type: "string",
              description: "Coordinates of the expedition"
            },
            region: {
              type: "string",
              description: "Region of the expedition"
            },

            mealsIncluded: {
              type: "string",
              description: "Meals included of the expedition"
            },

            transportation: {
              type: "string",
              description: "Transportation of the expedition"
            },
            startPoint: {
              type: "string",
              description: "Starting point of the expedition"
            },
            endPoint: {
              type: "string",
              description: "Ending point of the expedition"
            },
            subheading: {
              type: "string",
              description: "Subtitle or brief description of the expedition"
            },

            tripcode: {
              type: "string",
              description: "Code associated with the trip"
            },

            overview: {
              type: "string",
              description: "Summary of what the expedition entails"

            },

            season: {
              type: "string",
              description: "Season during which the expedition takes place"

            },

            category: {
              type: "string",
              description: "ID of the category the expedition falls under"

            },

            collections: {
              type: "string",
              description: "ID of the collection to which the expedition belongs"
            },

            banner: {
              type: "string",
              description: "URL to the banner image for the expedition"
            },


            routeMap: {
              type: "string",
              description: "URL to the route map image for the expedition"
            },

            gearList: {
              type: "string",
              description: "pdf file containing gear list"
            },

            equipmentList: {
              type: "string",
              description: "pdf file containing equipment list"
            },

            slug: {
              type: "string",
              description: "URL - friendly version of the expedition name"

            },

            maxElevation: {
              type: "string",
              description: "Maximum elevation reached during the expedition"

            },

            duration: {
              type: "number",
              description: "Duration of the expedition in days"
            },



            accomodation: {
              type: "string",
              description: "Type of accommodation provided"
            },

            groupSize: {
              type: "string",
              description: "Size of the group accommodated"

            },

            activity: {
              type: "string",
              description: "Type of activities included in the expedition"

            },

            physical: {
              type: "string",
              description: "Physical difficulty level of the expedition"

            },

            promoCode: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  description: "Code for promotional discounts"
                },
                percentage:
                {
                  type: " number",
                  description: "Discount percentage"

                },
                isActive:
                {
                  type: "boolean",
                  description: "Whether the promotional code is active"

                },
                expiration:
                {
                  type: "string",
                  format: "date-time",
                  description: "Expiration date of the promotional code"

                }
              }
            },

            price: {
              type: "object",
              properties: {
                adult: {
                  type: "object",
                  properties: {
                    pricePerAdult: {
                      type: "number",
                      description: "Price per adult for the expedition"
                    },

                    discountsA: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          minQuantity: {
                            type: "number",
                            description: "Minimum quantity of adults for discount eligibility"

                          },

                          maxQuantity: {
                            type: "number",
                            description: "Maximum quantity of adults for discount eligibility"

                          },

                          price: {
                            type: "number",
                            description: "Discounted price for the group"

                          }

                        }

                      }

                    }

                  }


                },
                children: {
                  type: "object",
                  properties: {
                    pricePerChildren: {
                      type: "number",
                      description: "Price per child for the expedition"
                    },

                    discountsC: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          minQuantity: {
                            type: "number",
                            description: "Minimum quantity of children for discount eligibility"

                          },

                          maxQuantity: {
                            type: "number",
                            description: "Maximum quantity of children for discount eligibility"

                          },

                          price: {
                            type: "number",
                            description: "Discounted price for the group"

                          }

                        }

                      }

                    }

                  }


                },
              }
            },

            isUpcoming: {
              type: "boolean",
              default: false,
              description: "Whether the expedition is upcoming"
            },

            showInHero: {
              type: "boolean",
              default: false,
              description: "Whether to show the expedition prominently on the website"

            },

            isBestseller: {
              type: "boolean",
              default: false,
              description: "Whether the expedition is considered a bestseller"

            },

            isFromOldSite: {
              type: "boolean",
              default: false,
              description: "Whether the expedition was carried over from an old site"

            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the expedition was created"

            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the expedition was last updated"

            }

          },
        },
        Training: {
          type: "object",
          required: ["heading",
            "title",
            "description",
            "slug"],

          properties: {
            trainingId: {
              type: "string",
              description: "Unique identifier for the training"
            },
            slug: {
              type: "string",
              description: "Unique identifier for the training"
            },


            heading: {
              type: "string",
              description: "Heading of the training"
            }
            ,
            title: {
              type: "string",
              description: "Title of the training"
            },

            thumbnail: {
              type: "string",
              description: "URL or identifier of the training thumbnail image"
            }
            ,
            description: {
              type: "string",
              description: "Detailed description of the training"
            }
            ,
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the training was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the training was last updated"
            }
          }
        },
        Fact: {
          type: "object",
          reqiored: ["title", "icon", "description", "expedition"],
          properties: {
            factId: {
              type: "string",
              description: "Unique identifier for the fact"
            },
            icon: {
              type: "string",
              description: "URL or identifier of the icon associated with the fact"
            },
            title: {
              type: "string",
              description: "Title of the fact"
            },

            description: {
              type: "string",
              description: "Description of the fact"
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with this fact"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the fact was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the fact was last updated"
            },

          }


        },
        Faq: {
          type: "object",
          required: ["title",
            "description",
            "expedition"],

          properties: {
            faqId: {
              type: "string",
              description: "Unique identifier for the FAQ"
            },

            title: {
              type: "string",
              description: "Title of the FAQ"
            },

            description: {
              type: "string",
              description: "Description or content of the FAQ"
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with this FAQ"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the FAQ was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the FAQ was last updated"
            },

          }

        },

        AddOn: {
          type: "object",
          required: ["fieldName",
            "price",
          ],

          properties: {
            addOnId: {
              type: "string",
              description: "Unique identifier for the add on"
            },

            fieldName: {
              type: "string",
              description: "name of add on field"
            },
            description: {
              type: "string",
              description: "description of add on field"
            },

            price: {
              type: "number",
              description: "price of field"
            },



            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the add on was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the add on was last updated"
            },

          }

        },
        FixedDate: {
          type: "object",
          required: ["startDate",
            "endDate",
            "days",
            "status",
            "groupSize",
            "expedition"],

          properties: {
            fixedDateId: {
              type: "string",
              description: "Unique identifier for the fixed date"
            },

            startDate: {
              type: "string",
              format: "date",
              description: "Start date of the fixed date period"
            },

            endDate: {
              type: "string",
              format: "date",
              description: "End date of the fixed date period"
            },

            days: {
              type: "number",
              description: "Number of days for the fixed date period"
            },

            status: {
              type: "string",
              description: "Status of the fixed date (e.g., available, booked)"
            },

            groupSize: {
              type: "string",
              description: "Size of the group that can be accommodated"
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with this fixed date"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the fixed date was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the fixed date was last updated"
            }

          }
        }
        ,
        GroupDeparture: {
          type: "object",
          required: ["startDate", "endDate", "duration",
         
            "totalQuantity",
            "soldQuantity",
            "expedition"],

          properties: {
            groupDepartureId: {
              type: "string",
              description: "Unique identifier for the group departure"
            },

            startDate: {
              type: "string",
              format: "date",
              description: "Start date of the group departure"
            },

            endDate: {
              type: "string",
              format: "date",
              description: "End date of the group departure"
            },

            duration: {
              type: "number",
              description: "Duration of the group departure in days"
            },

            price: {
              type: "number",
              description: "Price for the group departure"
            },

           

            totalQuantity: {
              type: "number",
              description: "Total quantity of spots available for the group departure"
            },

            soldQuantity: {
              type: "number",
              description: "Quantity of spots sold for the group departure"
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with this group departure"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the group departure was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the group departure was last updated"
            },

          }
        },
        PrivateDeparture: {
          type: "object",
          required: ["startDate", "endDate", "duration",
            "price",
          

            "expedition"],

          properties: {
            privateDepartureId: {
              type: "string",
              description: "Unique identifier for the private departure"
            },

            startDate: {
              type: "string",
              format: "date",
              description: "Start date of the private departure"
            },

            endDate: {
              type: "string",
              format: "date",
              description: "End date of the private departure"
            },

            duration: {
              type: "number",
              description: "Duration of the private departure in days"
            },

            price: {
              type: "number",
              description: "Price for the private departure"
            },

          

            totalQuantity: {
              type: "number",
              description: "Total quantity of spots available for the private departure"
            },

            soldQuantity: {
              type: "number",
              description: "Quantity of spots sold for the private departure"
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with this private departure"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the private departure was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the private departure was last updated"
            },

          }
        },

        Inquiry: {
          type: "object",
          required: ["fullName",
            "email",
            "phoneNo",
            "address",
            "message"],

          properties: {
            inquiryId: {
              type: "string",
              description: "Unique identifier for the inquiry"
            },

            fullName: {
              type: "string",
              description: "Full name of the person making the inquiry"
            },

            email: {
              type: "string",
              description: "Email address of the person making the inquiry"
            },

            phoneNo: {
              type: "string",
              description: "Phone number of the person making the inquiry"
            },

            address: {
              type: "string",
              description: "Address of the person making the inquiry"
            },

            message: {
              type: "string",
              description: "Message or details of the inquiry"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the inquiry was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the inquiry was last updated"
            }
          }
        },
        Iternary: {
          type: "object",
          required: ["day",
            "title",
            "expedition"],

          properties: {
            iternaryId: {
              type: "string",
              description: "Unique identifier for the itinerary"
            },

            day: {
              type: "string",
              description: "Day of the itinerary"
            },

            title: {
              type: "string",
              description: "Title of the itinerary entry"
            },

            description: {
              type: "string",
              description: "Detailed description of the itinerary entry"
            },

            shortDescription: {
              type: "string",
              description: "Short description of the itinerary entry"
            },

            images: {
              type: "array",
              items: {
                type: "string",
                description: "List of image URLs related to the itinerary entry"
              }
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with this itinerary"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the itinerary was created"
            }
            ,
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the itinerary was last updated"
            }

          }
        },
        Media: {
          type: "object",
          required:
            ["media", "expedition"],
          properties: {
            mediaId: {
              type: "string",
              description: "Unique identifier for the media"
            },

            media: {
              type: "string",
              description: "URL or identifier of the media file"
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with this media"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the media entry was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the media entry was last updated"
            }

          }
        },
        TripAttraction: {
          type: "object",
          required: [
            "title",
            "expedition", "order"],

          properties: {
            tripAttractionId: {
              type: "string",
              description: "Unique identifier for the trip attraction"
            },
            order: {
              type: "number",
              description: "order of add on field"
            },

            title: {
              type: "string",
              description: "Title of the trip attraction"
            },

            description: {
              type: "string",
              description: "Description of the trip attraction"
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with this trip attraction"
            },


            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the trip attraction was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the trip attraction was last updated"
            }
          }
        },
        Review: {
          type: "object",
          required: ["name",
            "email",
            "rating", "user", "expedition"]
          ,
          properties: {
            reviewId: {
              type: "string",
              description: "Unique identifier for the review"
            },

            message: {
              type: "string",
              description: "Message or content of the review"
            },

            name: {
              type: "string",
              description: "Name of the person who wrote the review"
            },

            email: {
              type: "string",
              description: "Email address of the person who wrote the review"
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with this review"
            },

            rating: {
              type: "number",
              description: "Rating given in the review"
            },

            isVerified: {
              type: "boolean",
              default: false,
              description: "Indicates whether the review is verified"
            },

            like: {
              type: "number",
              description: "Number of likes for the review"
            },

            images: {
              type: "array",
              items: {
                type: "string",
                description: "List of image URLs associated with the review"
              }
            },
            user: {
              type: "string",
              description: "ID of the user who wrote the review"
            }
            ,
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the review was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the review was last updated"
            }
          }
        },

        ValueAddition: {
          type: "object",
          required: ["title",
            "shortDescription", "image", "documents",
            "expedition"],

          properties: {
            valueAdditionId: {
              type: "string",
              description: "Unique identifier for the value addition"
            },

            title: {
              type: "string",
              description: "Title of the value addition"
            },

            shortDescription: {
              type: "string",
              description: "Short description of the value addition"
            },

            image: {
              type: "string",
              description: "URL or identifier of the image related to the value addition"
            },

            documents: {
              type: "string",
              description: "URL or identifier of the document related to the value addition"
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with this value addition"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the value addition was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the value addition was last updated"
            }
          }
        },

        Booking: {
          type: "object",
          required: ["fullName",
            "phone",
            "postalCode",
            "dob",
            "startDate",
            "endDate",

            "user"],

          properties: {
            bookingId: {
              type: "string",
              description: "Unique identifier for the booking"
            },

            fullName: {
              type: "string",
              description: "Full name of the person making the booking"
            },

            phone: {
              type: "number",
              description: "Phone number of the person making the booking"
            },

            postalCode: {
              type: "number",
              description: "Postal code of the person's address"
            },

            dob: {
              type: "string",
              description: "Date of birth of the person making the booking"
            },

            startDate: {
              type: "string",
              description: "Start date of the booking"
            },

            endDate: {
              type: "string",
              description: "End date of the booking"
            },

            adults: {
              type: "number",
              description: "Number of adults in the booking"
            },

            childrens: {
              type: "number",
              description: "Number of children in the booking"
            },

            note: {
              type: "string",
              description: "Additional notes for the booking"
            },

            invoiceSent: {
              type: "boolean",
              description: "Indicates whether the invoice has been sent"
            },

            paymentMethod: {
              type: "string",
              description: "Method of payment used for the booking"
            },

            paymentStatus: {
              type: "string",
              description: "Status of the payment for the booking"
            },

            emergencyName: {
              type: "string",
              description: "Name of the emergency contact person"
            },

            emergencyPhone: {
              type: "number",
              description: "Phone number of the emergency contact person"
            },

            emergencyRelationship: {
              type: "string",
              description: "Relationship of the emergency contact person"
            },

            paymentId: {
              type: "string",
              description: "Identifier for the payment transaction"
            },

            totalAmount: {
              type: "number",
              description: "Total amount of the booking"
            },

            depositAmount: {
              type: "number",
              description: "Deposit amount paid for the booking"
            },

            remainingAmount: {
              type: "number",
              description: "Remaining amount to be paid for the booking"
            },

            additionalServices: {
              type: "array",
              items: {
                type: "string",
                description: "Additional services requested for the booking"
              },
            },


            paymentOption: {
              type: "string",
              description: "Payment option selected for the booking",
              enum: ["full-payment", "deposit-payment"]
            },

            expedition: {
              type: "string",
              description: "ID of the expedition associated with the booking"
            },

            training: {
              type: "string",
              description: "ID of the training associated with the booking"
            },

            activity: {
              type: "string",
              description: "ID of the activity associated with the booking"
            },

            user: {
              type: "string",
              description: "ID of the user making the booking"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the booking was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the booking was last updated"
            },

          }
        },
        CustomTrip: {
          type: "object",
          required:

            [
              "noOfTravelers",
              "travelDate",
              "expedition",
              "accomodation",
              "fullName",
              "phone",
              "country",
              " email", "user"
            ],
          properties: {
            customTripId: {
              type: "string",
              description: "Unique identifier for the custom trip"
            },

            noOfTravelers: {
              type: "string",
              description: "Number of travelers"
            },

            travelDate: {
              type: "any",
              description: "Date of travel; can vary in format"
            },

            location: {
              type: "string",
              description: "Location of the trip"
            }
            ,
            expedition: {
              type: "string",
              description: "Reference to the Expedition object"
            },

            accomodation: {
              type: "string",
              description: "Accommodation type"
            },

            budgetRange: {
              type: "any",
              description: "Budget range for the trip"
            }
            ,
            fullName: {
              type: "string",
              description: "Full name of the person booking the trip"
            },

            phone: {
              type: "string",
              description: "Phone number of the person booking the trip"
            },

            country: {
              type: "string",
              description: "Country of the person booking the trip"
            },

            email: {
              type: "string",
              description: "Email address of the person booking the trip"
            },

            message: {
              type: "string",
              description: "Additional message or notes"
            },

            user: {
              type: "string",
              description: "Reference to the User object"
            }

          }
        },


        Subscriber: {
          type: "object",
          required:
            ["email"],
          properties: {
            subscriberId: {
              type: "string",
              description: "Unique identifier for the subscriber"
            },

            email: {
              type: "string",
              description: "Email address of the subscriber"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the subscriber record was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the subscriber record was last updated"
            }

          }
        },
        Notification: {
          type: "object",
          required: ["title"],
          properties: {

            notificationId: {
              type: "string",
              description: "Unique identifier for the notification"
            },

            title: {
              type: "string",
              description: "Title of the notification"
            },

            isSeen: {
              type: "boolean",
              default: false,
              description: "Indicates whether the notification has been seen"
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the notification was created"
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the notification was last updated"
            }

          }
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    servers: [
      {
        url: "https://api-staging.contourexpeditions.com/api",
        //url: "http://localhost:5017/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/routes/*.ts"], // Paths to API files
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
