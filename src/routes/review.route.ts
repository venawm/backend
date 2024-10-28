import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createReviewHandler, updateReviewHandler, getReviewHandler, getAllReviewHandler, deleteReviewHandler, getReviewByExpeditionHandler, deleteManyReviewHandler, } from "../controller/review.controller";
import { createReviewSchema, getReviewSchema, deleteReviewSchema } from "../schema/review.schema";
const router = express.Router();
router.post("/multiple-delete",deleteManyReviewHandler)
/**
 * @swagger
 * /review:
 *   post:
 *     summary: Create a new review entry
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       '201':
 *         description: Review entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '400':
 *         description: Bad request due to invalid input
 *       '500':
 *         description: Internal server error
 */

router.post("/", [validate(createReviewSchema)], createReviewHandler);
/**
 * @swagger
 * /review/{reviewId}:
 *   patch:
 *     summary: Update an existing review entry
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $Ref: '#/components/schemas/Review'
 *     responses:
 *       '200':
 *         description: Review entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Review entry not found
 *       '500':
 *         description: Internal server error
 */

router.patch("/:ReviewId", updateReviewHandler);
/**
 * @swagger
 * /review/{reviewId}:
 *   get:
 *     summary: Get a review entry by its ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review entry to retrieve
 *     responses:
 *       '200':
 *         description: Review entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '404':
 *         description: Review entry not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:ReviewId", [validate(getReviewSchema)], getReviewHandler);

/**
 * @swagger
 * /review:
 *   get:
 *     summary: Get all review entries
 *     tags: [Reviews]
 *     responses:
 *       '200':
 *         description: A list of all review entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllReviewHandler);

/**
 * @swagger
 * /review/{reviewId}:
 *   delete:
 *     summary: Delete a review entry by its ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review entry to delete
 *     responses:
 *       '200':
 *         description: Review entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Review entry not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:ReviewId", [validate(deleteReviewSchema)], deleteReviewHandler);

/**
 * @swagger
 * /review/by-expiditionId/{expeditionId}:
 *   get:
 *     summary: Get reviews by expedition ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the reviews
 *     responses:
 *       '200':
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '404':
 *         description: Reviews not found for the given expedition ID
 *       '500':
 *         description: Internal server error
 */

router.get("/by-expiditionId/:expeditionId", getReviewByExpeditionHandler);


export default router;
