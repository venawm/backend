import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createExpeditionHandler, updateExpeditionHandler, getExpeditionHandler, getAllExpeditionHandler, deleteExpeditionHandler, getAllExpeditionByTypeHandler, getAllExpeditionByMeterHandler, getAllExpeditionBySeasonTypeHandler, getExpeditionByObjectIdHandler, getAllUpcomingExpeditionHandler, getAllUpcomingTrekkingHandler, getExpeditionFromCategoryHandler, getExpeditionFromCollectionHandler, getAllExpeditionWithoutPopulateHandler, getMinimumPriceData, deleteManyExpeditionHandler, getReviewsStats, getExpeditionFromCategoryDashboardHandler } from "../controller/expedition.controller";
import { getExpeditionSchema, deleteExpeditionSchema, createExpeditionSchema, getExpeditionFromCategorySchema, getExpeditionFromCollectionSchema } from "../schema/expedition.schema";

const router = express.Router();


router.post("/multiple-delete",deleteManyExpeditionHandler)
/**
 * @swagger
 * /expeditions/:
 *   post:
 *     summary: Create a new expedition
 *     tags: [Expeditions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expedition'
 *     responses:
 *       201:
 *         description:Expedition created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expedition'
 *       500:
 *         description: Internal server error
 */
router.post(  "/", [  requireAdmin], createExpeditionHandler);




/**
 * @swagger
 * /expeditions/{expeditionId}:
 *   patch:
 *     summary: Update an existing expedition
 *     tags: [Expeditions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the expedition to update
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expedition'
 *     responses:
 *       200:
 *         description: Expedition updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expedition'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Expedition not found
 */
router.patch(
  "/:expeditionId",
  [

    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "routeMap", maxCount: 1 },
    ]),
  ],
  updateExpeditionHandler
);


/**
 * @swagger
 * /expeditions/{expeditionId}:
 *   get:
 *     summary: Retrieve an expedition by ID
 *     tags: [Expeditions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the expedition to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved the expedition
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expedition'
 *       '404':
 *         description: Expedition not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:expeditionId", [validate(getExpeditionSchema)], getExpeditionHandler);


/**
 * @swagger
 * /expeditions/category/{categoryId}:
 *   get:
 *     summary: Retrieve expeditions by category ID
 *     tags: [Expeditions]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to filter expeditions
 *     responses:
 *       '200':
 *         description: Successfully retrieved expeditions for the given category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expedition'
 *       '400':
 *         description: Bad request due to invalid parameters
 *       '404':
 *         description: No expeditions found for the given category ID
 *       '500':
 *         description: Internal server error
 */

router.get("/category/:categoryId", [validate(getExpeditionFromCategorySchema)], getExpeditionFromCategoryHandler);

router.get("/category-dashboard/:categoryId", [validate(getExpeditionFromCategorySchema)], getExpeditionFromCategoryDashboardHandler);

/**
 * @swagger
 * /expeditions/collection/{collectionId}:
 *   get:
 *     summary: Retrieve expeditions by collection ID
 *     tags: [Expeditions]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the collection to filter expeditions
 *     responses:
 *       '200':
 *         description: Successfully retrieved expeditions for the given collection
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expedition'
 *       '400':
 *         description: Bad request due to invalid parameters
 *       '404':
 *         description: No expeditions found for the given collection ID
 *       '500':
 *         description: Internal server error
 */

router.get("/collection/:collectionId", [validate(getExpeditionFromCollectionSchema)], getExpeditionFromCollectionHandler);

/**
 * @swagger
 * /expeditions:
 *   get:
 *     summary: Retrieve all expeditions
 *     tags: [Expeditions]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all expeditions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expedition'
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllExpeditionHandler);

/**
 * @swagger
 * /expeditions/min-price/{expeditionId}:
 *   get:
 *     summary: Get group departure with minimum price for banner
 *     tags: [GroupDepartures]
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the expedition to retrieve the minimum price data for
 *     responses:
 *       '200':
 *         description: Successfully retrieved the document with the minimum price
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupDeparture'
 *       '400':
 *         description: Bad request due to invalid expeditionId
 *       '500':
 *         description: Internal server error
 */

router.get("/min-price/:expeditionId", getMinimumPriceData);


/**
 * @swagger
 * /rating/{expeditionId}:
 *   get:
 *     summary: Retrieve review statistics for a specific expedition
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the expedition to retrieve review statistics for
 *     responses:
 *       '200':
 *         description: Successfully retrieved review statistics for the given expedition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 msg:
 *                   type: string
 *                   example: Get all data success
 *                 total:
 *                   type: integer
 *                   example: 10
 *                   description: The total number of reviews
 *                 average:
 *                   type: number
 *                   format: float
 *                   example: 4.5
 *                   description: The average rating of the reviews
 *       '400':
 *         description: Bad request due to invalid expeditionId
 *       '404':
 *         description: No reviews found for the given expedition ID
 *       '500':
 *         description: Internal server error
 */

router.get("/rating/:expeditionId",getReviewsStats)
router.get("/by-type/:expeditionId", getAllExpeditionByTypeHandler);

router.get("/by-meter/:meter", getAllExpeditionByMeterHandler);
router.get("/by-season-type/:season", getAllExpeditionBySeasonTypeHandler);
router.get("by-id/:expeditionId", [validate(getExpeditionSchema)], getExpeditionByObjectIdHandler);

router.get("/get-all/upcoming/expedition", getAllUpcomingExpeditionHandler);

router.get("/get-all/upcoming/trekking", getAllUpcomingTrekkingHandler);

// plane data without populate

/**
 * @swagger
 * /expeditions/get-all/plane-data-without-populate:
 *   get:
 *     summary: Retrieve all trips data 
 *     tags: [Expeditions]
 *     parameters:
 *       - in: query
 *         name: collections
 *        
 *         schema:
 *           type: string
 *         description: The ID of the collection to filter trips
 *       - in: query
 *         name: isUpcoming
 *   
 *         schema:
 *           type: boolean
 *         description: Filter trip that are upcoming
 *       - in: query
 *         name: showInHero
 *         schema:
 *           type: boolean
 *         description: Filter trips that should be shown in hero
 *       - in: query
 *         name: isBestseller
 *         schema:
 *           type: boolean
 *         description: Filter trips that are best sellers
 *     responses:
 *       '200':
 *         description: Successfully retrieved the expeditions without population
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expedition'
 *       '400':
 *         description: Bad request due to invalid parameters
 *       '500':
 *         description: Internal server error
 */

router.get("/get-all/plane-data-without-populate", getAllExpeditionWithoutPopulateHandler);

/**
 * @swagger
 * /expeditions/{expeditionId}:
 *   delete:
 *     summary: Delete an expedition by ID
 *     tags: [Expeditions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the expedition to be deleted
 *     responses:
 *       '200':
 *         description: Successfully deleted the expedition
 *       '400':
 *         description: Bad request due to invalid parameters
 *       '404':
 *         description: Expedition not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:expeditionId", [validate(deleteExpeditionSchema), requireAdmin], deleteExpeditionHandler);

export default router;
