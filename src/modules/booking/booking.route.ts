import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validation";

const router = Router();

router.post("/", auth, authorizeRoles("CUSTOMER"), validateRequest(bookingValidation.createBookingSchema), bookingController.createBooking);
router.get("/", auth, bookingController.getMyBookings);
router.patch("/:id", auth, validateRequest(bookingValidation.updateStatusSchema), authorizeRoles("CUSTOMER", "TECHNICIAN", "ADMIN"), bookingController.updateBookingStatus);

export default router;