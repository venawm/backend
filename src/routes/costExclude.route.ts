import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createCostExcludeHandler, updateCostExcludeHandler, getCostExcludeHandler, getAllCostExcludeHandler, deleteCostExcludeHandler, getCostExcludeByExpeditionHandler, deleteManyCostExcludeHandler } from "../controller/costExclude.controller";
import { createCostExcludeSchema, getCostExcludeSchema, deleteCostExcludeSchema } from "../schema/costExclude";

const router = express.Router();
router.post("/multiple-delete",deleteManyCostExcludeHandler)
/**
 * @swagger
 * /cost-excludes:
 *   post:
 *     summary: Create a new cost exclude entry
 *     tags: [Cost Excludes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CostExclude'
 *     responses:
 *       '201':
 *         description: Cost exclude entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CostExclude'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post("/", [ validate(createCostExcludeSchema),requireAdmin], createCostExcludeHandler);

/**
 * @swagger
 * /cost-excludes/{costExcludeId}:
 *   patch:
 *     summary: Update an existing cost exclude entry
 *     tags: [Cost Excludes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: costExcludeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cost exclude entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CostExclude'
 *     responses:
 *       '200':
 *         description: Cost exclude entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CostExclude'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Cost exclude entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:costExcludeId", [requireAdmin], updateCostExcludeHandler);

/**
 * @swagger
 * /cost-excludes/{costExcludeId}:
 *   get:
 *     summary: Get a cost exclude entry by its ID
 *     tags: [Cost Excludes]
 *     parameters:
 *       - in: path
 *         name: costExcludeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cost exclude entry to retrieve
 *     responses:
 *       '200':
 *         description: Cost exclude entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CostExclude'
 *       '404':
 *         description: Cost exclude entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:costExcludeId", [validate(getCostExcludeSchema)], getCostExcludeHandler);

/**
 * @swagger
 * /cost-excludes/by-expiditionId/{costExcludeId}:
 *   get:
 *     summary: Get cost exclude entries by expedition ID
 *     tags: [Cost Excludes]
 *     parameters:
 *       - in: path
 *         name: costExcludeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the cost exclude entries
 *     responses:
 *       '200':
 *         description: Cost exclude entries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CostExclude'
 *       '404':
 *         description: Cost exclude entries not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/by-expiditionId/:costExcludeId", [validate(getCostExcludeSchema)], getCostExcludeByExpeditionHandler);

/**
 * @swagger
 * /cost-excludes:
 *   get:
 *     summary: Get all cost exclude entries
 *     tags: [Cost Excludes]
 *     responses:
 *       '200':
 *         description: A list of all cost exclude entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CostExclude'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllCostExcludeHandler);

/**
 * @swagger
 * /cost-excludes/{costExcludeId}:
 *   delete:
 *     summary: Delete a cost exclude entry by its ID
 *     tags: [Cost Excludes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: costExcludeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cost exclude entry to delete
 *     responses:
 *       '200':
 *         description: Cost exclude entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Cost exclude entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:costExcludeId", [ validate(deleteCostExcludeSchema),requireAdmin], deleteCostExcludeHandler);

export default router;
