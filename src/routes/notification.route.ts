import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import {  deleteManyNotificationHandler, deleteNotificationHandler, getAllNotificationHandler, getNotificationHandler, getUnreadNotificationHandler, markAsRead, updateNotificationHandler } from "../controller/notification.controller";
import { createNotificationSchema, deleteNotificationSchema, getNotificationSchema } from "../schema/notification.schema";

const router = express.Router();
router.post("/multiple-delete",deleteManyNotificationHandler)
/**
 * @swagger
 * /notifications/{notificationId}:
 *   patch:
 *     summary: Update an existing notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the notification to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       '200':
 *         description: Notification updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Internal server error
 */

router.patch("/:notificationId",  updateNotificationHandler);

/**
 * @swagger
 * /notifications/markRead:
 *   put:
 *     summary: Mark notifications as read
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notificationIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of notification IDs to mark as read
 *     responses:
 *       '200':
 *         description: Notifications marked as read successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '500':
 *         description: Internal server error
 */

router.put("/markRead",markAsRead  );

/**
 * @swagger
 * /notifications/unread:
 *   get:
 *     summary: Get all unread notifications
 *     tags: [Notifications]
 *     responses:
 *       '200':
 *         description: A list of all unread notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       '500':
 *         description: Internal server error
 */

router.get("/unread",getUnreadNotificationHandler);

/**
 * @swagger
 * /notifications/{notificationId}:
 *   get:
 *     summary: Get a notification by its ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the notification to retrieve
 *     responses:
 *       '200':
 *         description: Notification retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:notificationId", [validate(getNotificationSchema),requireAdmin], getNotificationHandler);

/**
 * @swagger
 * /notifications/{notificationId}:
 *   delete:
 *     summary: Delete a notification by its ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the notification to delete
 *     responses:
 *       '200':
 *         description: Notification deleted successfully
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:notificationId", [requireAdmin], deleteNotificationHandler);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       '200':
 *         description: A list of all notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllNotificationHandler);


export default router;
