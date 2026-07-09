import { Router } from "express";
import { serviceController } from "./service.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";

const router = Router();

router.get("/", serviceController.getServices);
router.post("/", auth, authorizeRoles("TECHNICIAN"), serviceController.createService);

export default router;