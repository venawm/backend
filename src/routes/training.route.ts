import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createTrainingHandler, updateTrainingHandler, getTrainingHandler, getAllTrainingHandler, deleteTrainingHandler, deleteManyTrainingHandler } from "../controller/training.controller";
import { createTrainingSchema, getTrainingSchema, deleteTrainingSchema } from "../schema/training.schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();
router.post("/multiple-delete",deleteManyTrainingHandler)
/**
 * @swagger
 * /training:
 *   post:
 *     summary: Create a new training entry
 *     tags: [Trainings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Training'
 *     responses:
 *       '201':
 *         description: Training entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post(
  "/",
  [
   requireAdmin,

    validate(createTrainingSchema),
  ],
  createTrainingHandler
);

/**
 * @swagger
 * /training/{trainingId}:
 *   patch:
 *     summary: Update an existing training entry
 *     tags: [Trainings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trainingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the training entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Training'
 *     responses:
 *       '200':
 *         description: Training entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Training entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch(
  "/:trainingId",
  [
   requireAdmin,
  ],
  updateTrainingHandler
);

/**
 * @swagger
 * /training/{trainingId}:
 *   get:
 *     summary: Get a training entry by its ID
 *     tags: [Trainings]
 *     parameters:
 *       - in: path
 *         name: trainingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the training entry to retrieve
 *     responses:
 *       '200':
 *         description: Training entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       '404':
 *         description: Training entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:trainingId", [validate(getTrainingSchema)], getTrainingHandler);

/**
 * @swagger
 * /training:
 *   get:
 *     summary: Get all training entries
 *     tags: [Trainings]
 *     responses:
 *       '200':
 *         description: A list of all training entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Training'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllTrainingHandler);

/**
 * @swagger
 * /training/{trainingId}:
 *   delete:
 *     summary: Delete a training entry by its ID
 *     tags: [Trainings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trainingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the training entry to delete
 *     responses:
 *       '200':
 *         description: Training entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Training entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:trainingId", [validate(deleteTrainingSchema)], deleteTrainingHandler);

export default router;
