import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidation } from "./admin.validation";

const router = Router();

router.get("/users", auth, authorizeRoles("ADMIN"), adminController.getUsers);
router.patch("/users/:id", auth, validateRequest(adminValidation.updateUserStatusSchema), authorizeRoles("ADMIN"), adminController.updateUserStatus);
router.get("/bookings", auth, authorizeRoles("ADMIN"), adminController.getAllBookings);

export default router;