import { Router } from "express";
import { userController } from "../user/user.controller";
import { authValidation } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
    "/register",
    validateRequest(authValidation.registerValidationSchema),
    userController.registerUser
);

router.post(
    "/login",
    validateRequest(authValidation.loginValidationSchema),
    userController.loginUser
);

router.get("/me", auth, userController.getMe);
router.post("/seed-admin", userController.seedAdmin);

export default router;