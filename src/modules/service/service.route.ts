import { Router } from "express";
import { serviceController } from "./service.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { serviceValidation } from "./service.validation";

const router = Router();

router.get("/", serviceController.getServices);
router.post("/", auth, authorizeRoles("TECHNICIAN"), validateRequest(serviceValidation.createServiceSchema), serviceController.createService);

export default router;