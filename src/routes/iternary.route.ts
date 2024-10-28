import express from "express";
import { validate } from "../middleware/validateResource";
import { createIternaryHandler, updateIternaryHandler, getIternaryHandler, getAllIternaryHandler, deleteIternaryHandler, getIternaryByExpeditionHandler, deleteManyIternaryHandler, getIternaryByActivityHandler } from "../controller/iternary.controller";
import { createIternarySchema, deleteIternarySchema, getIternarySchema } from "../schema/iternary.schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();
router.post("/multiple-delete",deleteManyIternaryHandler)
/**
 * @swagger
 * /iternaries:
 *   post:
 *     summary: Create a new itinerary entry
 *     tags: [Iternaries]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Iternary'
 *     responses:
 *       '201':
 *         description: Itinerary entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Iternary'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post("/", [validate(createIternarySchema),requireAdmin], createIternaryHandler);
/**
 * @swagger
 * /iternaries/{iternaryId}:
 *   patch:
 *     summary: Update an existing itinerary entry
 *     tags: [Iternaries]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: iternaryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the itinerary entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Iternary'
 *     responses:
 *       '200':
 *         description: Itinerary entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Iternary'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Itinerary entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:iternaryId", [requireAdmin],updateIternaryHandler);
/**
 * @swagger
 * /iternaries/{iternaryId}:
 *   get:
 *     summary: Get an itinerary entry by its ID
 *     tags: [Iternaries]
 *     parameters:
 *       - in: path
 *         name: iternaryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the itinerary entry to retrieve
 *     responses:
 *       '200':
 *         description: Itinerary entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Iternary'
 *       '404':
 *         description: Itinerary entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:iternaryId", [validate(getIternarySchema)], getIternaryHandler);
/**
 * @swagger
 * /iternaries/by-expeditionId/{iternaryId}:
 *   get:
 *     summary: Get itineraries by expedition ID
 *     tags: [Iternaries]
 *     parameters:
 *       - in: path
 *         name: iternaryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the itineraries
 *     responses:
 *       '200':
 *         description: Itineraries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Iternary'
 *       '404':
 *         description: Itineraries not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/by-expeditionId/:iternaryId", [validate(getIternarySchema)], getIternaryByExpeditionHandler);
/**
 * @swagger
 * /iternaries/by-activityId/{iternaryId}:
 *   get:
 *     summary: Get itineraries by Activity ID
 *     tags: [Iternaries]
 *     parameters:
 *       - in: path
 *         name: iternaryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The activity ID associated with the itineraries
 *     responses:
 *       '200':
 *         description: Itineraries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Iternary'
 *       '404':
 *         description: Itineraries not found for the given activity ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */
router.get("/by-activityId/:iternaryId", [validate(getIternarySchema)], getIternaryByActivityHandler);

/**
 * @swagger
 * /iternaries:
 *   get:
 *     summary: Get all itinerary entries
 *     tags: [Iternaries]
 *     responses:
 *       '200':
 *         description: A list of all itinerary entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Iternary'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllIternaryHandler);
/**
 * @swagger
 * /iternaries/{iternaryId}:
 *   delete:
 *     summary: Delete an itinerary entry by its ID
 *     tags: [Iternaries]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: iternaryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the itinerary entry to delete
 *     responses:
 *       '200':
 *         description: Itinerary entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Itinerary entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:iternaryId", [validate(deleteIternarySchema),requireAdmin], deleteIternaryHandler);

export default router;
