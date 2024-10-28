import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createInquiryHandler, deleteInquiryHandler, deleteManyInquiryHandler, getAllInquiryHandler, getInquiryHandler, updateInquiryHandler } from "../controller/inquiry.controller";
import { createInquirySchema, deleteInquirySchema, getInquirySchema } from "../schema/inquiry.schema";

const router = express.Router();
router.post("/multiple-delete",deleteManyInquiryHandler)
/**
 * @swagger
 * /inquiries:
 *   post:
 *     summary: Create a new inquiry
 *     tags: [Inquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inquiry'
 *     responses:
 *       '201':
 *         description: Inquiry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inquiry'
 *       '400':
 *         description: Bad request due to invalid input
 *       '500':
 *         description: Internal server error
 */

router.post("/", [ validate(createInquirySchema)], createInquiryHandler);

/**
 * @swagger
 * /inquiries/{inquiryId}:
 *   patch:
 *     summary: Update an existing inquiry
 *     tags: [Inquiries]
 *     parameters:
 *       - in: path
 *         name: inquiryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the inquiry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inquiry'
 *     responses:
 *       '200':
 *         description: Inquiry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inquiry'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Inquiry not found
 *       '500':
 *         description: Internal server error
 */

router.patch("/:inquiryId",  updateInquiryHandler);

/**
 * @swagger
 * /inquiries/{inquiryId}:
 *   get:
 *     summary: Get an inquiry by its ID
 *     tags: [Inquiries]
 *     parameters:
 *       - in: path
 *         name: inquiryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the inquiry to retrieve
 *     responses:
 *       '200':
 *         description: Inquiry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inquiry'
 *       '404':
 *         description: Inquiry not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:inquiryId", [validate(getInquirySchema),requireAdmin], getInquiryHandler);

/**
 * @swagger
 * /inquiries:
 *   get:
 *     summary: Get all inquiries
 *     tags: [Inquiries]
 *     responses:
 *       '200':
 *         description: A list of all inquiries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inquiry'
 *       '500':
 *         description: Internal server error
 */

router.get("/",[requireAdmin], getAllInquiryHandler);

/**
 * @swagger
 * /inquiries/{inquiryId}:
 *   delete:
 *     summary: Delete an inquiry by its ID
 *     tags: [Inquiries]
 *     parameters:
 *       - in: path
 *         name: inquiryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the inquiry to delete
 *     responses:
 *       '200':
 *         description: Inquiry deleted successfully
 *       '404':
 *         description: Inquiry not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:inquiryId", [ validate(deleteInquirySchema),requireAdmin], deleteInquiryHandler);

export default router;
