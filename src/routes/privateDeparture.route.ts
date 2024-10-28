import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createPrivateDepartureHandler, updatePrivateDepartureHandler, getPrivateDepartureHandler, getAllPrivateDepartureHandler, deletePrivateDepartureHandler, getPrivateDepartureByExpeditionHandler, deleteManyPrivateDepartureHandler } from "../controller/privateDeparture.controller";
import { getPrivateDepartureSchema, deletePrivateDepartureSchema, createPrivateDepartureSchema } from "../schema/privateDeparture.schema";

const router = express.Router();
router.post("/multiple-delete",deleteManyPrivateDepartureHandler)
/**
 * @swagger
 * /privateDeparture:
 *   post:
 *     summary: Create a new private departure entry
 *     tags: [PrivateDepartures]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $Ref: '#/components/schemas/PrivateDeparture'
 *     responses:
 *       '201':
 *         description: Private departure entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $Ref: '#/components/schemas/PrivateDeparture'
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
  createPrivateDepartureHandler
);

/**
 * @swagger
 * /privateDeparture/{privateDepartureId}:
 *   patch:
 *     summary: Update an existing private departure entry
 *     tags: [PrivateDepartures]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: privateDepartureId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the private departure entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $Ref: '#/components/schemas/PrivateDeparture'
 *     responses:
 *       '200':
 *         description: Private departure entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $Ref: '#/components/schemas/PrivateDeparture'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Private departure entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch(
  "/:privateDepartureId",
  [
     requireAdmin,
  ],
  updatePrivateDepartureHandler
);

/**
 * @swagger
 * /privateDeparture/{privateDepartureId}:
 *   get:
 *     summary: Get a private departure entry by its ID
 *     tags: [PrivateDepartures]
 *     parameters:
 *       - in: path
 *         name: privateDepartureId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the private departure entry to retrieve
 *     responses:
 *       '200':
 *         description: Private departure entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $Ref: '#/components/schemas/PrivateDeparture'
 *       '404':
 *         description: Private departure entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:privateDepartureId", [validate(getPrivateDepartureSchema)], getPrivateDepartureHandler);
/**
 * @swagger
 * /privateDeparture:
 *   get:
 *     summary: Get all private departure entries
 *     tags: [PrivateDepartures]
 *     responses:
 *       '200':
 *         description: A list of all private departure entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $Ref: '#/components/schemas/PrivateDeparture'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllPrivateDepartureHandler);

/**
 * @swagger
 * /privateDeparture/{privateDepartureId}:
 *   delete:
 *     summary: Delete a private departure entry by its ID
 *     tags: [PrivateDepartures]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: privateDepartureId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the private departure entry to delete
 *     responses:
 *       '200':
 *         description: Private departure entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Private departure entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:privateDepartureId", [validate(deletePrivateDepartureSchema),requireAdmin], deletePrivateDepartureHandler);

/**
 * @swagger
 * /privateDeparture/by-expiditionId/{expeditionId}:
 *   get:
 *     summary: Get private departures by expedition ID
 *     tags: [PrivateDepartures]
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the private departures
 *     responses:
 *       '200':
 *         description: Private departures retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $Ref: '#/components/schemas/PrivateDeparture'
 *       '404':
 *         description: Private departures not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/by-expiditionId/:expeditionId",  getPrivateDepartureByExpeditionHandler);


export default router;
