import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";

const router = Router();

router.get("/users", auth, authorizeRoles("ADMIN"), adminController.getUsers);
router.patch("/users/:id", auth, authorizeRoles("ADMIN"), adminController.updateUserStatus);
router.get("/bookings", auth, authorizeRoles("ADMIN"), adminController.getAllBookings);

export default router;