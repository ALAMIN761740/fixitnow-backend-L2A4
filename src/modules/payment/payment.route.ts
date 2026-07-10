import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { paymentValidation } from "./payment.validation";

const router = Router();

router.post("/create", auth, authorizeRoles("CUSTOMER"), validateRequest(paymentValidation.createPaymentSchema), paymentController.createPayment);
router.post("/confirm", auth, authorizeRoles("CUSTOMER"), validateRequest(paymentValidation.confirmPaymentSchema), paymentController.confirmPayment);
router.get("/", auth, paymentController.getMyPayments);

export default router;