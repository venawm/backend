import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createGroupDepartureHandler, updateGroupDepartureHandler, getGroupDepartureHandler, getAllGroupDepartureHandler, deleteGroupDepartureHandler, getGroupDepartureByExpeditionHandler, deleteManyGroupDepartureHandler, updateSoldGroupDepartureHandler } from "../controller/groupDeparture.controller";
import { getGroupDepartureSchema, deleteGroupDepartureSchema, createGroupDepartureSchema } from "../schema/groupDeparture.schema";

const router = express.Router();
router.post("/multiple-delete",deleteManyGroupDepartureHandler)
/**
 * @swagger
 * /groupDeparture:
 *   post:
 *     summary: Create a new group departure entry
 *     tags: [GroupDepartures]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupDeparture'
 *     responses:
 *       '201':
 *         description: Group departure entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupDeparture'
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
  ],
  createGroupDepartureHandler
);





/**
 * @swagger
 * /sold/{groupDepartureId}:
 *   patch:
 *     summary: Update sold group departure
 *     description: Updates the details of a sold group departure by its ID.
 *     tags:
 *       - Group Departure
 *     parameters:
 *       - in: path
 *         name: groupDepartureId
 *         required: true
 *         description: The ID of the group departure to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: integer
 *                 description: The total booked count for the group departure.
 *            
 *           
 *     responses:
 *       200:
 *         description: Successfully updated the group departure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Group departure updated successfully."
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Group departure not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/sold/:groupDepartureId", updateSoldGroupDepartureHandler);



/**
 * @swagger
 * /groupDeparture/{groupDepartureId}:
 *   patch:
 *     summary: Update an existing group departure entry
 *     tags: [GroupDepartures]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupDepartureId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group departure entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupDeparture'
 *     responses:
 *       '200':
 *         description: Group departure entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupDeparture'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Group departure entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch(
  
  "/:groupDepartureId",
  [
    requireAdmin,
  ],
  updateGroupDepartureHandler
);





/**
 * @swagger
 * /groupDeparture/{groupDepartureId}:
 *   get:
 *     summary: Get a group departure entry by its ID
 *     tags: [GroupDepartures]
 *     parameters:
 *       - in: path
 *         name: groupDepartureId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group departure entry to retrieve
 *     responses:
 *       '200':
 *         description: Group departure entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupDeparture'
 *       '404':
 *         description: Group departure entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:groupDepartureId", [validate(getGroupDepartureSchema)], getGroupDepartureHandler);
/**
 * @swagger
 * /groupDeparture:
 *   get:
 *     summary: Get all group departure entries
 *     tags: [GroupDepartures]
 *     responses:
 *       '200':
 *         description: A list of all group departure entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupDeparture'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllGroupDepartureHandler);
/**
 * @swagger
 * /groupDeparture/{groupDepartureId}:
 *   delete:
 *     summary: Delete a group departure entry by its ID
 *     tags: [GroupDepartures]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupDepartureId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group departure entry to delete
 *     responses:
 *       '200':
 *         description: Group departure entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Group departure entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:groupDepartureId", [validate(deleteGroupDepartureSchema),requireAdmin], deleteGroupDepartureHandler);
/**
 * @swagger
 * /groupDeparture/by-expiditionId/{expeditionId}:
 *   get:
 *     summary: Get group departures by expedition ID
 *     tags: [GroupDepartures]
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the group departures
 *     responses:
 *       '200':
 *         description: Group departures retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupDeparture'
 *       '404':
 *         description: Group departures not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/by-expiditionId/:expeditionId",  getGroupDepartureByExpeditionHandler);
export default router;

