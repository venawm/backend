import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createFaqHandler, updateFaqHandler, getFaqHandler, getAllFaqHandler, deleteFaqHandler, getFaqByExpeditionHandler, deleteManyFaqHandler, swapFaqOrder } from "../controller/faq.controller";
import { createFaqSchema, getFaqSchema, deleteFaqSchema, SwapFaqSchema } from "../schema/faq.schema";

const router = express.Router();
router.post("/multiple-delete",deleteManyFaqHandler)


router.post("/swap-order", [requireAdmin, validate(SwapFaqSchema)], swapFaqOrder);


/**
 * @swagger
 * /faq:
 *   post:
 *     summary: Create a new FAQ entry
 *     tags: [FAQs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Faq'
 *     responses:
 *       '201':
 *         description: FAQ entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faq'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post("/", [ requireAdmin,validate(createFaqSchema)], createFaqHandler);

/**
 * @swagger
 * /faq/{faqId}:
 *   patch:
 *     summary: Update an existing FAQ entry
 *     tags: [FAQs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: faqId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Faq'
 *     responses:
 *       '200':
 *         description: FAQ entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faq'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: FAQ entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:faqId",[requireAdmin],  updateFaqHandler);

/**
 * @swagger
 * /faq/{faqId}:
 *   get:
 *     summary: Get an FAQ entry by its ID
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: faqId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ entry to retrieve
 *     responses:
 *       '200':
 *         description: FAQ entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faq'
 *       '404':
 *         description: FAQ entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:faqId", [validate(getFaqSchema)], getFaqHandler);

/**
 * @swagger
 * /faq/by-expiditionId/{expeditionId}:
 *   get:
 *     summary: Get FAQs by expedition ID
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: expeditionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The expedition ID associated with the FAQs
 *     responses:
 *       '200':
 *         description: FAQs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faq'
 *       '404':
 *         description: FAQs not found for the given expedition ID
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/by-expiditionId/:expeditionId",  getFaqByExpeditionHandler);

/**
 * @swagger
 * /faq:
 *   get:
 *     summary: Get all FAQ entries
 *     tags: [FAQs]
 *     responses:
 *       '200':
 *         description: A list of all FAQ entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faq'
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllFaqHandler);

/**
 * @swagger
 * /faq/{faqId}:
 *   delete:
 *     summary: Delete an FAQ entry by its ID
 *     tags: [FAQs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: faqId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ entry to delete
 *     responses:
 *       '200':
 *         description: FAQ entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: FAQ entry not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.delete("/:faqId", [requireAdmin, validate(deleteFaqSchema)], deleteFaqHandler);

export default router;
