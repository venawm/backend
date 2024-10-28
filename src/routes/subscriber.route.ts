import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createSubscriberSchema, deleteSubscriberSchema, getSubscriberSchema } from "../schema/subscriber.schema";
import { createSubscriberHandler, deleteManySubscriberHandler, deleteSubscriberHandler, getAllSubscriberHandler, getSubscriberHandler, replySubscriberHandler, updateSubscriberHandler } from "../controller/subscriber.controller";
const router = express.Router();
router.post("/multiple-delete",deleteManySubscriberHandler)
/**
 * @swagger
 * /subscribers:
 *   post:
 *     summary: Create a new subscriber
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscriber'
 *     responses:
 *       '201':
 *         description: Subscriber created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscriber'
 *       '400':
 *         description: Bad request due to invalid input
 *       '500':
 *         description: Internal server error
 */

router.post("/", [validate(createSubscriberSchema)], createSubscriberHandler);

/**
 * @swagger
 * /subscribers/{subscriberId}:
 *   patch:
 *     summary: Update an existing subscriber
 *     tags: [Subscribers]
 *     parameters:
 *       - in: path
 *         name: subscriberId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscriber to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscriber'
 *     responses:
 *       '200':
 *         description: Subscriber updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscriber'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Subscriber not found
 *       '500':
 *         description: Internal server error
 */

router.patch("/:subscriberId", [validate(createSubscriberSchema)], updateSubscriberHandler);

/**
 * @swagger
 * /subscribers/reply:
 *   post:
 *     summary: Reply to a subscriber
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:

 *               type:object
 * properties:
 * images:
 *                 type: array
 *                 items:
 * type:string
 *               to:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Reply sent successfully



 *       '400':
 *         description: Bad request due to invalid input
 *       '500':
 *         description: Internal server error
 */

router.post("/reply", replySubscriberHandler);

/**
 * @swagger
 * /subscribers/{subscriberId}:
 *   get:
 *     summary: Get a subscriber by its ID
 *     tags: [Subscribers]
 *     parameters:
 *       - in: path
 *         name: subscriberId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscriber to retrieve
 *     responses:
 *       '200':
 *         description: Subscriber retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscriber'
 *       '404':
 *         description: Subscriber not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:subscriberId", [validate(getSubscriberSchema)], getSubscriberHandler);

/**
 * @swagger
 * /subscribers:
 *   get:
 *     summary: Get all subscribers
 *     tags: [Subscribers]
 *     responses:
 *       '200':
 *         description: A list of all subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscriber'
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllSubscriberHandler);

/**
 * @swagger
 * /subscribers/{subscriberId}:
 *   delete:
 *     summary: Delete a subscriber by its ID
 *     tags: [Subscribers]
 *     parameters:
 *       - in: path
 *         name: subscriberId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscriber to delete
 *     responses:
 *       '200':
 *         description: Subscriber deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Subscriber not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:subscriberId", [validate(deleteSubscriberSchema)], deleteSubscriberHandler);

export default router;
