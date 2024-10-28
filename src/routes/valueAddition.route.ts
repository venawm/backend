import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createValueAdditionHandler, updateValueAdditionHandler, getValueAdditionHandler, getAllValueAdditionHandler, deleteValueAdditionHandler, getValueAdditionByExpeditionHandler, deleteManyValueAdditionHandler } from "../controller/valueAddition.controller";
import { createValueAdditionSchema, getValueAdditionSchema, deleteValueAdditionSchema } from "../schema/valueAddition.schema";
import { reverse } from "lodash";

const router = express.Router();
router.post("/multiple-delete",deleteManyValueAdditionHandler)
/**
 * @swagger
 * /valueAddition:
 *   post:
 *     summary: Create a new value addition entry
 *     tags: [Value Additions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValueAddition'
 *     responses:
 *       '201':
 *         description: Value addition entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValueAddition'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post("/", [ validate(createValueAdditionSchema),requireAdmin], createValueAdditionHandler);

/**
 * @swagger
 * /valueAddition/{valueAdditionId}:
 *   patch:
 *     summary: Update an existing value addition entry
 *     tags: [Value Additions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: valueAdditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the value addition entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValueAddition'
 *     responses:
 *       '200':
 *         description: Value addition entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValueAddition'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Value addition entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:valueAdditionId", [requireAdmin], updateValueAdditionHandler);

/**
 * @swagger
 * /valueAddition/{valueAdditionId}:
 *   get:
 *     summary: Get a value addition entry by its ID
 *     tags: [Value Additions]
 *     parameters:
 *       - in: path
 *         name: valueAdditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the value addition entry to retrieve
 *     responses:
 *       '200':
 *         description: Value addition entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValueAddition'
 *       '404':
 *         description: Value addition entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:valueAdditionId", [validate(getValueAdditionSchema)], getValueAdditionHandler);

/**
 * @swagger
 * /valueAddition/by-expiditionId/{expeditionId}:
 *   get:
 *     summary: Get value additions by expedition ID
 *     tags: [Value Additions]
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the value additions
 *     responses:
 *       '200':
 *         description: Value additions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ValueAddition'
 *       '404':
 *         description: Value additions not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/by-expiditionId/:expeditionId", getValueAdditionByExpeditionHandler);

/**
 * @swagger
 * /valueAddition:
 *   get:
 *     summary: Get all value addition entries
 *     tags: [Value Additions]
 *     responses:
 *       '200':
 *         description: A list of all value addition entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ValueAddition'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllValueAdditionHandler);

/**
 * @swagger
 * /valueAddition/{valueAdditionId}:
 *   delete:
 *     summary: Delete a value addition entry by its ID
 *     tags: [Value Additions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: valueAdditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the value addition entry to delete
 *     responses:
 *       '200':
 *         description: Value addition entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Value addition entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:valueAdditionId", [ validate(deleteValueAdditionSchema),requireAdmin], deleteValueAdditionHandler);

export default router;
