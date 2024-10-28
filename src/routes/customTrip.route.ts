import express from "express";
import { validate } from "../middleware/validateResource";

import { createCustomTripHandler, deleteCustomTripHandler, deleteManyCustomTripHandler, getAllCustomTripHandler, getCustomTripHandler, updateCustomTripHandler } from "../controller/customTrip.controller";
import { deleteCustomTripSchema, getCustomTripSchema } from "../schema/customTrip.schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();
router.post("/multiple-delete",deleteManyCustomTripHandler)
/**
 * @swagger
 * /custom-trip:
 *   post:
 *     summary: Create a new custom trip
 *     tags: [CustomTrips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomTrip'
 *     responses:
 *       '201':
 *         description: Custom trip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomTrip'
 *       '400':
 *         description: Bad request due to invalid input
 *       '500':
 *         description: Internal server error
 */

router.post("/", createCustomTripHandler);

/**
 * @swagger
 * /custom-trip/{customTripId}:
 *   patch:
 *     summary: Update an existing custom trip
 *     tags: [CustomTrips]
 *     parameters:
 *       - in: path
 *         name: customTripId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the custom trip to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomTrip'
 *     responses:
 *       '200':
 *         description: Custom trip updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomTrip'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Custom trip not found
 *       '500':
 *         description: Internal server error
 */

router.patch("/:customTripId", updateCustomTripHandler);

/**
 * @swagger
 * /custom-trip/{customTripId}:
 *   get:
 *     summary: Get a custom trip by its ID
 *     tags: [CustomTrips]
 *     parameters:
 *       - in: path
 *         name: customTripId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the custom trip to retrieve
 *     responses:
 *       '200':
 *         description: Custom trip retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomTrip'
 *       '404':
 *         description: Custom trip not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:customTripId", [validate(getCustomTripSchema)], getCustomTripHandler);

/**
 * @swagger
 * /custom-trip:
 *   get:
 *     summary: Get all custom trips
 *     tags: [CustomTrips]
 *     responses:
 *       '200':
 *         description: A list of all custom trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomTrip'
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllCustomTripHandler);

/**
 * @swagger
 * /custom-trip/{customTripId}:
 *   delete:
 *     summary: Delete a custom trip by its ID
 *     tags: [CustomTrips]
 *     parameters:
 *       - in: path
 *         name: customTripId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the custom trip to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Custom trip deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Custom trip not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:customTripId", [validate(deleteCustomTripSchema), requireAdmin], deleteCustomTripHandler);

export default router;
