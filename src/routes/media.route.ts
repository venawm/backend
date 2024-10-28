import express from "express";
import { validate } from "../middleware/validateResource";
import {
  createMediaHandler,
  getMediaHandler,
  deleteMediaHandler,
  getMediaByExpeditionHandler,
  updateMediaHandler,
  deleteManyMediaHandler,
} from "../controller/media.controller";
import {
  createMediaSchema,
  getMediaSchema,
  deleteMediaSchema,
  updateMediaSchema,
} from "../schema/media.schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();
router.post("/multiple-delete", deleteManyMediaHandler);
/**
 * @swagger
 * /medias:
 *   post:
 *     summary: Create a new media entry
 *     tags: [Media]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Media'
 *     responses:
 *       '201':
 *         description: Media entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post(
  "/",
  [validate(createMediaSchema), requireAdmin],
  createMediaHandler
);
/**
 * @swagger
 * /medias/{mediaId}:
 *   patch:
 *     summary: Update an existing media entry
 *     tags: [Media]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mediaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the media entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Media'
 *     responses:
 *       '200':
 *         description: Media entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Media entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:mediaId", [requireAdmin], updateMediaHandler);
/**
 * @swagger
 * /medias/{mediaId}:
 *   get:
 *     summary: Get a media entry by its ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: mediaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the media entry to retrieve
 *     responses:
 *       '200':
 *         description: Media entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       '404':
 *         description: Media entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:mediaId", [validate(getMediaSchema)], getMediaHandler);
/**
 * @swagger
 * /medias/by-expiditionId/{mediaId}:
 *   get:
 *     summary: Get media entries by expedition ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: mediaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the media entries
 *     responses:
 *       '200':
 *         description: Media entries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Media'
 *       '404':
 *         description: Media entries not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get(
  "/by-expiditionId/:mediaId",
  [validate(getMediaSchema)],
  getMediaByExpeditionHandler
);
/**
 * @swagger
 * /medias/{mediaId}:
 *   delete:
 *     summary: Delete a media entry by its ID
 *     tags: [Media]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mediaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the media entry to delete
 *     responses:
 *       '200':
 *         description: Media entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Media entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete(
  "/:mediaId",
  [validate(deleteMediaSchema), requireAdmin],
  deleteMediaHandler
);

export default router;
