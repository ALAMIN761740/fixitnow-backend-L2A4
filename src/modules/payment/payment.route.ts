import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";

const router = Router();

router.post("/create", auth, authorizeRoles("CUSTOMER"), paymentController.createPayment);
router.post("/confirm", auth, authorizeRoles("CUSTOMER"), paymentController.confirmPayment);
router.get("/", auth, paymentController.getMyPayments);

export default router;