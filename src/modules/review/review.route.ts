import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValidation } from "./review.validation";

const router = Router();

router.post("/", auth, authorizeRoles("CUSTOMER"), validateRequest(reviewValidation.createReviewSchema), reviewController.createReview);

export default router;