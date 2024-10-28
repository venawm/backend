import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import {
  createCostIncludeHandler,
  updateCostIncludeHandler,
  getCostIncludeHandler,
  getAllCostIncludeHandler,
  deleteCostIncludeHandler,
  getCostIncludeByExpeditionHandler,
  deleteManyCostIncludeHandler,
} from "../controller/costInclude.controller";
import {
  createCostIncludeSchema,
  getCostIncludeSchema,
  deleteCostIncludeSchema,
} from "../schema/costInclude.schema";

const router = express.Router();

router.post("/multiple-delete", deleteManyCostIncludeHandler);
/**
 * @swagger
 * /cost-includes:
 *   post:
 *     summary: Create a new cost include entry
 *     tags: [Cost Includes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CostInclude'
 *     responses:
 *       '201':
 *         description: Cost include entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CostInclude'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post(
  "/",
  [validate(createCostIncludeSchema), requireAdmin],
  createCostIncludeHandler
);

/**
 * @swagger
 * /cost-includes/{costIncludeId}:
 *   patch:
 *     summary: Update an existing cost include entry
 *     tags: [Cost Includes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: costIncludeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cost include entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CostInclude'
 *     responses:
 *       '200':
 *         description: Cost include entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CostInclude'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Cost include entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:costIncludeId", [requireAdmin], updateCostIncludeHandler);

/**
 * @swagger
 * /cost-includes/{costIncludeId}:
 *   get:
 *     summary: Get a cost include entry by its ID
 *     tags: [Cost Includes]
 *     parameters:
 *       - in: path
 *         name: costIncludeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cost include entry to retrieve
 *     responses:
 *       '200':
 *         description: Cost include entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CostInclude'
 *       '404':
 *         description: Cost include entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get(
  "/:costIncludeId",
  [validate(getCostIncludeSchema)],
  getCostIncludeHandler
);

/**
 * @swagger
 * /cost-includes/by-expiditionId/{costIncludeId}:
 *   get:
 *     summary: Get cost include entries by expedition ID
 *     tags: [Cost Includes]
 *     parameters:
 *       - in: path
 *         name: costIncludeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the cost include entries
 *     responses:
 *       '200':
 *         description: Cost include entries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CostInclude'
 *       '404':
 *         description: Cost include entries not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get(
  "/by-expiditionId/:costIncludeId",
  [validate(getCostIncludeSchema)],
  getCostIncludeByExpeditionHandler
);

/**
 * @swagger
 * /cost-includes:
 *   get:
 *     summary: Get all cost include entries
 *     tags: [Cost Includes]
 *     responses:
 *       '200':
 *         description: A list of all cost include entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CostInclude'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllCostIncludeHandler);

/**
 * @swagger
 * /cost-includes/{costIncludeId}:
 *   delete:
 *     summary: Delete a cost include entry by its ID
 *     tags: [Cost Includes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: costIncludeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cost include entry to delete
 *     responses:
 *       '200':
 *         description: Cost include entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Cost include entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete(
  "/:costIncludeId",
  [validate(deleteCostIncludeSchema), requireAdmin],
  deleteCostIncludeHandler
);

export default router;
