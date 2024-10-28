import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createFactHandler, updateFactHandler, getFactHandler, getAllFactHandler, deleteFactHandler, getFactByExpeditionHandler, deleteManyFactHandler } from "../controller/fact.controller";
import { createFactSchema, getFactSchema, deleteFactSchema } from "../schema/fact.schema";

const router = express.Router();
router.post("/multiple-delete",deleteManyFactHandler)
/**
 * @swagger
 * /fact:
 *   post:
 *     summary: Create a new fact entry
 *     tags: [Facts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fact'
 *     responses:
 *       '201':
 *         description: Fact entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fact'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post("/", [ validate(createFactSchema),requireAdmin], createFactHandler);
/**
 * @swagger
 * /fact/{factId}:
 *   patch:
 *     summary: Update an existing fact entry
 *     tags: [Facts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: factId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fact entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fact'
 *     responses:
 *       '200':
 *         description: Fact entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fact'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Fact entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:factId", [requireAdmin], updateFactHandler);
/**
 * @swagger
 * /fact/{factId}:
 *   get:
 *     summary: Get a fact entry by its ID
 *     tags: [Facts]
 *     parameters:
 *       - in: path
 *         name: factId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fact entry to retrieve
 *     responses:
 *       '200':
 *         description: Fact entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fact'
 *       '404':
 *         description: Fact entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:factId", [validate(getFactSchema)], getFactHandler);

/**
 * @swagger
 * /fact/by-expiditionId/{expeditionId}:
 *   get:
 *     summary: Get facts by expedition ID
 *     tags: [Facts]
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the facts
 *     responses:
 *       '200':
 *         description: Facts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fact'
 *       '404':
 *         description: Facts not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/by-expiditionId/:expeditionId", getFactByExpeditionHandler);

/**
 * @swagger
 * /fact:
 *   get:
 *     summary: Get all fact entries
 *     tags: [Facts]
 *     responses:
 *       '200':
 *         description: A list of all fact entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fact'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllFactHandler);

/**
 * @swagger
 * /fact/{factId}:
 *   delete:
 *     summary: Delete a fact entry by its ID
 *     tags: [Facts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: factId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fact entry to delete
 *     responses:
 *       '200':
 *         description: Fact entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Fact entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:factId", [ validate(deleteFactSchema),requireAdmin], deleteFactHandler);

export default router;
