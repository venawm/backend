import express from "express";
import { validate } from "../middleware/validateResource";
import { createBookingHandler, updateBookingHandler, getBookingHandler, getAllBookingHandler, deleteBookingHandler, cancelBookingHandler, sendInvoiceHandler, getUserBookingHandler, deleteManyBookingHandler, updatePaymentStatusBookingHandler } from "../controller/booking.controller";
import { createBookingSchema, deleteBookingSchema, getBookingSchema } from "../schema/booking.schema";
import { requireAdmin } from "../middleware/requireAdmin";
import upload from "../middleware/multer";
const router = express.Router();

router.post("/multiple-delete",deleteManyBookingHandler)
/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       '201':
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '400':
 *         description: Bad request due to invalid input
 *       '500':
 *         description: Internal server error
 */

router.post("/", createBookingHandler);
/**
 * @swagger
 * /bookings/sendInvoice/{bookingId}:
 *   post:
 *     summary: Send an invoice for a specific booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the booking to send an invoice for
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The invoice file to upload
 *     responses:
 *       '200':
 *         description: Invoice sent successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal server error
 */

router.post("/sendInvoice/:bookingId",[upload.single('file'),], sendInvoiceHandler);
/**
 * @swagger
 * /bookings/{bookingId}:
 *   get:
 *     summary: Get a booking by its ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the booking to retrieve
 *     responses:
 *       '200':
 *         description: Booking retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:bookingId", [validate(getBookingSchema)], getBookingHandler);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       '200':
 *         description: A list of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       '500':
 *         description: Internal server error
 */

router.get("/", getAllBookingHandler);

/**
 * @swagger
 * /bookings/user/{userId}:
 *   get:
 *     summary: Get all bookings for a specific user
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve bookings for
 *     responses:
 *       '200':
 *         description: A list of bookings for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

router.get("/user/:userId", getUserBookingHandler);

/**
 * @swagger
 * /bookings/{bookingId}:
 *   delete:
 *     summary: Delete a booking by its ID
 *     tags: [Bookings]
  *      security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the booking to delete
 *     responses:
 *       '200':
 *         description: Booking deleted successfully
 *       '400':
 *         description: Bad request due to invalid input
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:bookingId", [validate(deleteBookingSchema),requireAdmin], deleteBookingHandler);
router.patch("/payment/:bookingId", updatePaymentStatusBookingHandler);
router.patch("/:bookingId", updateBookingHandler);
export default router;
