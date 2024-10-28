import express from "express";

import { getAdvPaymentsData, getBookingTrends, getFullPaymentsData, getOverviewData } from "../controller/statistics.controller";
const router = express.Router();

router.post("/", getOverviewData);
router.post("/full-payments", getFullPaymentsData);
router.post("/advance-payments", getAdvPaymentsData);
router.post("/booking-trends",getBookingTrends);
export default router;
