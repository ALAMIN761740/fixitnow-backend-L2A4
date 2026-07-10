import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { technicianValidation } from "./technician.validation";

const router = Router();

router.get("/", technicianController.getTechnicians);
router.get("/:id", technicianController.getTechnicianById);
router.post("/profile", auth, authorizeRoles("TECHNICIAN"), validateRequest(technicianValidation.profileSchema), technicianController.createOrUpdateProfile);
router.put("/profile", auth, authorizeRoles("TECHNICIAN"), validateRequest(technicianValidation.profileSchema), technicianController.createOrUpdateProfile);
router.get("/bookings", auth, authorizeRoles("TECHNICIAN"), technicianController.getMyBookings);
router.patch("/bookings/:id", auth, validateRequest(technicianValidation.updateBookingStatusSchema), authorizeRoles("TECHNICIAN"), technicianController.updateBookingStatus);
router.post("/availability", auth, authorizeRoles("TECHNICIAN"), validateRequest(technicianValidation.availabilitySchema), technicianController.addAvailability);

export default router;