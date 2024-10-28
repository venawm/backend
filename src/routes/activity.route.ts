import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createActivityHandler, updateActivityHandler, getActivityHandler, getAllActivityHandler, deleteActivityHandler, deleteManyActivityHandler } from "../controller/activity.controller";
import { createActivitySchema, getActivitySchema, deleteActivitySchema } from "../schema/activity";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

router.post("/multiple-delete",deleteManyActivityHandler)
/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Activity management API
 */

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       201:
 *         description: Activity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Internal server error
 */
router.post("/", [validate(createActivitySchema), requireAdmin], createActivityHandler);


/**
 * @swagger
 * /activities/{activityId}:
 *   patch:
 *     summary: Update an existing activity
 *     tags: [Activities]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the activity to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               banner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Activity not found
 */
router.patch("/:activityId", [upload.single("image"), requireAdmin], updateActivityHandler);

/**
 * @swagger
 * /activities/{activityId}:
 *   get:
 *     summary: Get an activity by ID
 *     tags: [Activities]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the activity to retrieve
 *     responses:
 *       200:
 *         description: Activity retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 */
router.get("/:activityId", [validate(getActivitySchema)], getActivityHandler);

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Get all activities
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: List of all activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 */
router.get("/", getAllActivityHandler);

/**
 * @swagger
 * /activities/{activityId}:
 *   delete:
 *     summary: Delete an activity by ID
 *     tags: [Activities]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the activity to delete
 *     responses:
 *       200:
 *         description: Activity deleted successfully
 *       404:
 *         description: Activity not found
 */
router.delete("/:activityId", [validate(deleteActivitySchema), requireAdmin], deleteActivityHandler);

export default router;
