import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createBlogHandler, updateBlogHandler, getBlogHandler, getAllBlogHandler, deleteBlogHandler, getAllBlogHandlerForCard, deleteManyBlogHandler } from "../controller/blog.controller";
import { createBlogSchema, getBlogSchema, deleteBlogSchema } from "../schema/blog.schema";

const router = express.Router();
router.post("/multiple-delete",deleteManyBlogHandler)
/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog entry
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '201':
 *         description: Blog entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: Bad request due to invalid input
 *       '500':
 *         description: Internal server error
 */

router.post("/", createBlogHandler);

/**
 * @swagger
 * /blogs/{blogId}:
 *   patch:
 *     summary: Update an existing blog entry
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $Ref: '#/components/schemas/Blog'
 *     responses:
 *       '200':
 *         description: Blog entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Blog entry not found
 *       '500':
 *         description: Internal server error
 */

router.patch("/:blogId", updateBlogHandler);

/**
 * @swagger
 * /blogs/{blogId}:
 *   get:
 *     summary: Get a blog entry by its ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog entry to retrieve
 *     responses:
 *       '200':
 *         description: Blog entry retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog entry not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:blogId", getBlogHandler);

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blog entries
 *     tags: [Blogs]
 *     responses:
 *       '200':
 *         description: A list of all blog entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllBlogHandler);
/**
 * @swagger
 * /blogs/get-all-blogs/for-card:
 *   get:
 *     summary: Get all blog entries formatted for card display
 *     tags: [Blogs]
 *     responses:
 *       '200':
 *         description: A list of blog entries formatted for card display
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogForCard'
 *       '500':
 *         description: Internal server error
 */

router.get("/get-all-blogs/for-card", getAllBlogHandlerForCard);

/**
 * @swagger
 * /blogs/{blogId}:
 *   delete:
 *     summary: Delete a blog entry by its ID
 *     tags: [Blogs]
 *      security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog entry to delete
 *     responses:
 *       '200':
 *         description: Blog entry deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Blog entry not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:blogId", [validate(deleteBlogSchema),requireAdmin], deleteBlogHandler);

export default router;
