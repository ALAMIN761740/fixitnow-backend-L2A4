import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";

const router = Router();

router.post("/", auth, authorizeRoles("CUSTOMER"), bookingController.createBooking);
router.get("/", auth, bookingController.getMyBookings);
router.patch("/:id", auth, bookingController.updateBookingStatus);

export default router;