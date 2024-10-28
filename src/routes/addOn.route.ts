import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createAddOnHandler, updateAddOnHandler, getAddOnHandler, getAllAddOnHandler, deleteAddOnHandler, deleteManyAddOnHandler } from "../controller/addOn.controller";
import { createAddOnSchema, getAddOnSchema, deleteAddOnSchema } from "../schema/addOn.schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();
router.post("/multiple-delete",deleteManyAddOnHandler)
/**
 * @swagger
 * /add-ons:
 *   post:
 *     summary: Create a new add-on entry
 *     tags: [AddOns]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddOn'
 *     responses:
 *       '201':
 *         description: Add-on entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddOn'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post("/",  [validate(createAddOnSchema),requireAdmin], createAddOnHandler);
/**
 * @swagger
 * /add-ons/{addOnId}:
 *   patch:
 *     summary: Update an existing add-on entry
 *     tags: [AddOns]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addOnId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the add-on entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddOn'
 *     responses:
 *       '200':
 *         description: Add-on entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddOn'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Add-on entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:addOnId",[requireAdmin],  updateAddOnHandler);
/**
 * @swagger
 * /add-ons/{addOnId}:
 *   get:
 *     summary: Get an add-on entry by its ID
 *     tags: [AddOns]
 *     parameters:
 *       - in: path
 *         name: addOnId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the add-on entry to retrieve
 *     responses:
 *       '200':
 *         description: Add-on entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddOn'
 *       '404':
 *         description: Add-on entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:addOnId", [validate(getAddOnSchema)], getAddOnHandler);
/**
 * @swagger
 * /add-ons:
 *   get:
 *     summary: Get all add-on entries
 *     tags: [AddOns]
 *     responses:
 *       '200':
 *         description: A list of all add-on entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddOn'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllAddOnHandler);

/**
 * @swagger
 * /add-ons/{addOnId}:
 *   delete:
 *     summary: Delete an add-on entry by its ID
 *     tags: [AddOns]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: addOnId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the add-on entry to delete
 *     responses:
 *       '200':
 *         description: Add-on entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Add-on entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:addOnId", [validate(deleteAddOnSchema),requireAdmin], deleteAddOnHandler);

export default router;
