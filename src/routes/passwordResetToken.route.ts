import express from "express";
import { createPasswordResetTokenHandler, updatePasswordResetTokenHandler, getPasswordResetTokenHandler } from "../controller/passwordResetToken.controller";

const router = express.Router();

router.post("/", createPasswordResetTokenHandler);
router.patch("/:passwordResetTokenId", updatePasswordResetTokenHandler);
router.get("/:token", getPasswordResetTokenHandler);

export default router;
