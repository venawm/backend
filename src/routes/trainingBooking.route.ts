import express from "express";
import { validate } from "../middleware/validateResource";
import { createBookingHandler, updateBookingHandler, getBookingHandler, getAllBookingHandler, deleteBookingHandler, cancelBookingHandler } from "../controller/trainingBooking.controller";
import { createTrainingBookingSchema, deleteTrainingBookingSchema, getTrainingBookingSchema } from "../schema/trainingBooking.schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();



router.post("/",[validate(createTrainingBookingSchema)], createBookingHandler);



router.patch("/:trainingBookingId", updateBookingHandler);



router.get("/:trainingBookingId", [validate(getTrainingBookingSchema)], getBookingHandler);


router.get("/", getAllBookingHandler);



router.delete("/:trainingBookingId", [validate(deleteTrainingBookingSchema),requireAdmin], deleteBookingHandler);
export default router;
