import { Router } from "express";
import { userValidator } from "../validators/user.validator.js";
import { userCotroller } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/create", userValidator.register, userCotroller.register);

router.put("/verify-email/:token", userCotroller.verifyEmail);

router.get("/:id", authenticate, userCotroller.getUser);

router.post("/reset-password", userValidator.resetPassword, userCotroller.resetPassword );

router.put("/password/:token", userValidator.confirmResetPassoword, userCotroller.confirmResetPassword);

export default router;






