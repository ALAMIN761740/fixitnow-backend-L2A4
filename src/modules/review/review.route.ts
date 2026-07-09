import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";

const router = Router();

router.post("/", auth, authorizeRoles("CUSTOMER"), reviewController.createReview);

export default router;