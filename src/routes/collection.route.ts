import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import {
  createCollectionHandler,
  updateCollectionHandler,
  getCollectionHandler,
  getAllCollectionHandler,
  deleteCollectionHandler,
} from "../controller/collection.controller";
import {
  createCollectionSchema,
  getCollectionSchema,
  deleteCollectionSchema,
} from "../schema/collection.schema";
import upload from "../middleware/multer";

const router = express.Router();

/**
 * @swagger
 * /collections:
 *   post:
 *     summary: Create a new collection
 *     tags: [Collections]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Collection created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post(
  "/",
  [validate(createCollectionSchema), requireAdmin],
  createCollectionHandler
);

/**
 * @swagger
 * /collections/{collectionId}:
 *   patch:
 *     summary: Update an existing collection
 *     tags: [Collections]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the collection to update
 *     requestBody:
 *       required: true
 *       content:
 *            application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Collection updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Collection not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:collectionId", [requireAdmin], updateCollectionHandler);

/**
 * @swagger
 * /collections/{collectionId}:
 *   get:
 *     summary: Get a collection by its ID
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the collection to retrieve
 *     responses:
 *       '200':
 *         description: Collection retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       '404':
 *         description: Collection not found

 *       '500':
 *         description: Internal server error
 */

router.get(
  "/:collectionId",
  [validate(getCollectionSchema)],
  getCollectionHandler
);

/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Get all collections
 *     tags: [Collections]
 *     responses:
 *       '200':
 *         description: A list of all collections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collection'

 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllCollectionHandler);

/**
 * @swagger
 * /collections/{collectionId}:
 *   delete:
 *     summary: Delete a collection by its ID
 *     tags: [Collections]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the collection to delete
 *     responses:
 *       '200':
 *         description: Collection deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Collection not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete(
  "/:collectionId",
  [validate(deleteCollectionSchema), requireAdmin],
  deleteCollectionHandler
);

export default router;
