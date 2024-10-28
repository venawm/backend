import express from "express";
import { validate } from "../middleware/validateResource";
import { createFixedDateHandler, updateFixedDateHandler, getFixedDateHandler, getAllFixedDateHandler, deleteFixedDateHandler, getFixedDateByExpeditionHandler, deleteManyFixedDateHandler } from "../controller/fixedDate.controller";
import { getFixedDateSchema, deleteFixedDateSchema, createFixedDateSchema } from "../schema/fixedDate.schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();
router.post("/multiple-delete",deleteManyFixedDateHandler)
/**
 * @swagger
 * /fixed-dates:
 *   post:
 *     summary: Create a new fixed date entry
 *     tags: [FixedDates]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FixedDate'
 *     responses:
 *       '201':
 *         description: Fixed date entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FixedDate'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */


router.post("/", [ validate(createFixedDateSchema),requireAdmin], createFixedDateHandler);

/**
 * @swagger
 * /fixed-dates/{fixedDateId}:
 *   patch:
 *     summary: Update an existing fixed date entry
 *     tags: [FixedDates]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fixedDateId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fixed date entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FixedDate'
 *     responses:
 *       '200':
 *         description: Fixed date entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FixedDate'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Fixed date entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:fixedDateId",[requireAdmin],  updateFixedDateHandler);

/**
 * @swagger
 * /fixed-dates/{fixedDateId}:
 *   get:
 *     summary: Get a fixed date entry by its ID
 *     tags: [FixedDates]
 *     parameters:
 *       - in: path
 *         name: fixedDateId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fixed date entry to retrieve
 *     responses:
 *       '200':
 *         description: Fixed date entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FixedDate'
 *       '404':
 *         description: Fixed date entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:fixedDateId", [validate(getFixedDateSchema)], getFixedDateHandler);
/**
 * @swagger
 * /fixed-dates:
 *   get:
 *     summary: Get all fixed date entries
 *     tags: [FixedDates]
 *     responses:
 *       '200':
 *         description: A list of all fixed date entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FixedDate'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllFixedDateHandler);
/**
 * @swagger
 * /fixed-dates/by-expeditionId/{expeditionId}:
 *   get:
 *     summary: Get fixed dates by expedition ID
 *     tags: [FixedDates]
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the fixed dates
 *     responses:
 *       '200':
 *         description: Fixed dates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FixedDate'
 *       '404':
 *         description: Fixed dates not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/by-expeditionId/:expeditionId",  getFixedDateByExpeditionHandler);
/**
 * @swagger
 * /fixed-dates/{fixedDateId}:
 *   delete:
 *     summary: Delete a fixed date entry by its ID
 *     tags: [FixedDates]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fixedDateId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fixed date entry to delete
 *     responses:
 *       '200':
 *         description: Fixed date entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Fixed date entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:fixedDateId", [ validate(deleteFixedDateSchema),requireAdmin], deleteFixedDateHandler);

export default router;
