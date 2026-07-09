import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";

const router = Router();

router.get("/", technicianController.getTechnicians);
router.get("/:id", technicianController.getTechnicianById);
router.post("/profile", auth, authorizeRoles("TECHNICIAN"), technicianController.createOrUpdateProfile);
router.put("/profile", auth, authorizeRoles("TECHNICIAN"), technicianController.createOrUpdateProfile);
router.get("/bookings", auth, authorizeRoles("TECHNICIAN"), technicianController.getMyBookings);
router.patch("/bookings/:id", auth, authorizeRoles("TECHNICIAN"), technicianController.updateBookingStatus);
router.post("/availability", auth, authorizeRoles("TECHNICIAN"), technicianController.addAvailability);

export default router;