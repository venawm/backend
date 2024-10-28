import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createCategoryHandler, updateCategoryHandler, getCategoryHandler, getAllCategoryHandler, deleteCategoryHandler, getCategoryFromCollectionHandler, getCategoryFromCollectionByIdHandler } from "../controller/category.controller";
import { createCategorySchema, getCategorySchema, deleteCategorySchema, getCategoryFromCollectionSchema } from "../schema/category.schema";
import upload from "../middleware/multer";

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '201':
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.post("/", [requireAdmin], createCategoryHandler);


/**
 * @swagger
 * /categories/{categoryId}:
 *   patch:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Category not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.patch("/:categoryId", [requireAdmin], updateCategoryHandler);

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Retrieve a category by its ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve
 *     responses:
 *       '200':
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category not found
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '500':
 *         description: Internal server error
 */

router.get("/:categoryId", [ validate(getCategorySchema)], getCategoryHandler);

/**
 * @swagger
 * /categories/collection/{collectionId}:
 *   get:
 *     summary: Retrieve categories associated with a specific collection by slug
 *     tags: [Categories]

 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the collection to retrieve categories from
 *     responses:
 *       '200':
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Collection not found or no categories associated with the collection ID

 *       '500':
 *         description: Internal server error
 */

router.get("/collection/:collectionId", [ validate(getCategoryFromCollectionSchema)], getCategoryFromCollectionHandler);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Categories]

 *     responses:
 *       '200':
 *         description: A list of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'

 *       '500':
 *         description: Internal server error
 */

router.get("/",  getAllCategoryHandler);

/**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     summary: Delete a category by its ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '401':
 *         description: Unauthorized request due to missing or invalid authentication
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:categoryId", [ validate(deleteCategorySchema),requireAdmin], deleteCategoryHandler);

/**
 * @swagger
 * /categories/collection/{collectionId}:
 *   get:
 *     summary: Retrieve categories associated with a specific collection by Id
 *     tags: [Categories]

 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the collection to retrieve categories from
 *     responses:
 *       '200':
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Collection not found or no categories associated with the collection ID

 *       '500':
 *         description: Internal server error
 */

router.get("/collection/by-id/:collectionId", [ validate(getCategoryFromCollectionSchema)], getCategoryFromCollectionByIdHandler);

export default router;
