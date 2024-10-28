import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createTripAttractionHandler, updateTripAttractionHandler, getTripAttractionHandler, getAllTripAttractionHandler, deleteTripAttractionHandler, getTripAttractionByExpeditionHandler, deleteManyTripAttractionHandler } from "../controller/tripattraction.controller";
import { createTripAttractionSchema, getTripAttractionSchema, deleteTripAttractionSchema } from "../schema/tripattraction.schema";

const router = express.Router();

router.post("/multiple-delete",deleteManyTripAttractionHandler)
/**
 * @swagger
 * /tripAttraction:
 *   post:
 *     summary: Create a new trip attraction entry
 *     tags: [Trip Attractions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TripAttraction'
 *     responses:
 *       '201':
 *         description: Trip attraction entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripAttraction'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post("/", [ validate(createTripAttractionSchema),requireAdmin], createTripAttractionHandler);
/**
 * @swagger
 * /tripAttraction/{tripAttractionId}:
 *   patch:
 *     summary: Update an existing trip attraction entry
 *     tags: [Trip Attractions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripAttractionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the trip attraction entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TripAttraction'
 *     responses:
 *       '200':
 *         description: Trip attraction entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripAttraction'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Trip attraction entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:tripAttractionId",[requireAdmin] , updateTripAttractionHandler);

/**
 * @swagger
 * /tripAttraction/{tripAttractionId}:
 *   get:
 *     summary: Get a trip attraction entry by its ID
 *     tags: [Trip Attractions]
 *     parameters:
 *       - in: path
 *         name: tripAttractionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the trip attraction entry to retrieve
 *     responses:
 *       '200':
 *         description: Trip attraction entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripAttraction'
 *       '404':
 *         description: Trip attraction entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:tripAttractionId", [validate(getTripAttractionSchema)], getTripAttractionHandler);
/**
 * @swagger
 * /tripAttraction/by-expiditionId/{expeditionId}:
 *   get:
 *     summary: Get trip attractions by expedition ID
 *     tags: [Trip Attractions]
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the trip attractions
 *     responses:
 *       '200':
 *         description: Trip attractions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TripAttraction'
 *       '404':
 *         description: Trip attractions not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/by-expiditionId/:expeditionId", getTripAttractionByExpeditionHandler);
/**
 * @swagger
 * /tripAttraction:
 *   get:
 *     summary: Get all trip attraction entries
 *     tags: [Trip Attractions]
 *     responses:
 *       '200':
 *         description: A list of all trip attraction entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TripAttraction'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllTripAttractionHandler);

/**
 * @swagger
 * /tripAttraction/{tripAttractionId}:
 *   delete:
 *     summary: Delete a trip attraction entry by its ID
 *     tags: [Trip Attractions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripAttractionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the trip attraction entry to delete
 *     responses:
 *       '200':
 *         description: Trip attraction entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Trip attraction entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:tripAttractionId", [ validate(deleteTripAttractionSchema),requireAdmin], deleteTripAttractionHandler);

export default router;
