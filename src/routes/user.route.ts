import express from "express";
import {
  authenticateToken,
  createRoleSpecificUserHandler,
  createUserHandler,
  deleteUserHandler,
  getAllUserExceptAdminHandler,
  getAllUserHandler,
  getRoleSpecificUserHandler,
  getUserAvailabilityHandler,
  getUserByUsernameHandler,
  getUserFromTokenHandler,
  getUserHandler,
  loginUserHandler,
  updatePasswordHandler,
  updateRoleSpecificUserHandler,
  updateUserHandler,
  updateUserPasswordByAdminHandler,
  verifyEmailHander,
} from "../controller/user.controller";
import {
  createUserSchema,
  getUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../schema/user.schema";
import { validate } from "../middleware/validateResource";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/register", [validate(createUserSchema)], createUserHandler);

/**
 * @swagger
 * /register-special-user:
 *   post:
 *     summary: Register a special user (admin required)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Special user registered successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden - Admin rights required
 */
router.post(
  "/register-special-user",
  [validate(createUserSchema), requireAdmin],
  createRoleSpecificUserHandler
);

router.post("/availability", getUserAvailabilityHandler);
// router.post("/login", [validate(loginUserSchema)], loginUserHandler);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication routes
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: lokichaulagain@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: MS1LSZZVFv
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Login success
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 accessToken:
 *                   type: string
 *                   description: JWT token for accessing protected routes
 *                   example: "your.jwt.token.here"
 *                 user:
 *                   type: object
 *                   description: User object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f7c0e5e7340c001c3c7c9b"
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *       500:
 *         description: Internal server error
 */

router.post("/login", [validate(loginUserSchema)], loginUserHandler);

/**
 * @swagger
 * /role/{userId}:
 *   patch:
 *     summary: Update the role of a specific user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.patch(
  "/role/:userId",
  [validate(updateUserSchema)],
  updateRoleSpecificUserHandler
);

/**
 * @swagger
 * /password/{userId}:
 *   patch:
 *     summary: Update a user's password by an admin
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.patch(
  "/password/:userId",
  [validate(updateUserSchema)],
  updateUserPasswordByAdminHandler
);

/**
 * @swagger
 * /{userId}:
 *   patch:
 *     summary: Update a user's details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.patch("/:userId", [validate(updateUserSchema)], updateUserHandler);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get users by specific roles
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successful retrieval of users
 */
router.get("/roles", getRoleSpecificUserHandler);

/**
 * @swagger
 * /all:
 *   get:
 *     summary: Get all users except admin
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successful retrieval of users
 */
router.get("/all", getAllUserExceptAdminHandler);

/**
 * @swagger
 * /{userId}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successful retrieval of user
 *       404:
 *         description: User not found
 */
router.get("/:userId", validate(getUserSchema), getUserHandler);
// router.get("/", getAllUserHandler);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users.
 *       500:
 *         description: Internal server error.
 */
router.get("/", getAllUserHandler);

/**
 * @swagger
 * /{userId}:
 *   delete:
 *     summary: Delete a user by ID (admin only)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to be deleted
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Forbidden - Admin rights required
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.delete("/:userId", [requireAdmin], deleteUserHandler);

/**
 * @swagger
 * /get-user-from-token/{pass-token-in-header}:
 *   get:
 *     summary: Get user from token
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized or invalid token
 */
router.get(
  "/get-user-from-token/:pass-token-in-header",
  authenticateToken,
  getUserFromTokenHandler
);

/**
 * @swagger
 * /verify-email/{token}:
 *   get:
 *     summary: Verify user's email with a token
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Email verification token
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.get("/verify-email/:token", verifyEmailHander);

/**
 * @swagger
 * /password-reset/{email}:
 *   patch:
 *     summary: Reset user password by email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email address of the user to reset the password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid input or email not found
 */
router.patch("/password-reset/:email", updatePasswordHandler);

export default router;
