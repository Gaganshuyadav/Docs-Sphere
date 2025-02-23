import { Router } from "express";
import { authValidator } from "../validators/auth.validator.js";
import { authController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.js";
const router = Router();
router.post("/login", authValidator.login, authController.login);
router.post("/refresh-token", authValidator.refreshToken, authController.refreshToken);
router.delete("/logout", authenticate, authController.logout);
export default router;
