import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth, authorizeRoles } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";

const router = Router();

router.get("/", categoryController.getCategories);
router.post("/", auth, authorizeRoles("ADMIN"), validateRequest(categoryValidation.createCategorySchema), categoryController.createCategory);

export default router;