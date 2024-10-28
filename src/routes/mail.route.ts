import express from "express";
import { validate } from "../middleware/validateResource";
import { createMailSchema } from "../schema/mail.schema";
import { sendMailHandler } from "../controller/mail.controller";

const router = express.Router();

router.post("/", [validate(createMailSchema)], sendMailHandler);

export default router;
