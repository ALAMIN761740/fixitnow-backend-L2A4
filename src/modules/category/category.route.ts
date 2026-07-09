import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";

const router = Router();

router.get("/", categoryController.getCategories);
router.post("/", auth, authorizeRoles("ADMIN"), categoryController.createCategory);

export default router;