import express from "express";
import { getNestedData } from "../controller/global.controller";


const router = express.Router();


router.get("/get-data-for-navbar", getNestedData);

export default router;
