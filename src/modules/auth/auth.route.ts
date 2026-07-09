import { Router } from "express";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
    "/register",
    validateRequest(authValidation.registerValidationSchema),
    authController.registerUser
);

router.post(
    "/login",
    validateRequest(authValidation.loginValidationSchema),
    authController.loginUser
);

router.get("/me", auth, authController.getMe);
router.post("/seed-admin", authController.seedAdmin);

export default router;