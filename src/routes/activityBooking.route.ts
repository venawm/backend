import express from "express";
import { validate } from "../middleware/validateResource";
import { createBookingHandler, updateBookingHandler, getBookingHandler, getAllBookingHandler, deleteBookingHandler, cancelBookingHandler } from "../controller/activityBooking.controller";
import { createActivityBookingSchema, deleteActivityBookingSchema, getActivityBookingSchema } from "../schema/activityBooking.schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();




router.post("/", createBookingHandler);



router.patch("/:activityBookingId", updateBookingHandler);



router.get("/:activityBookingId", [validate(getActivityBookingSchema)], getBookingHandler);


router.get("/", getAllBookingHandler);


router.delete("/:activityBookingId", [validate(deleteActivityBookingSchema),requireAdmin], deleteBookingHandler);
export default router;
