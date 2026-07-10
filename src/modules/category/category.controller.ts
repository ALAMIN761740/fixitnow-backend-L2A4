import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { categoryService } from "./category.service";

const getCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await categoryService.getCategories();

    res.status(200).json({ success: true, message: "Categories fetched successfully", data: categories });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await categoryService.createCategory(req.body);

    res.status(201).json({ success: true, message: "Category created successfully", data: category });
});

export const categoryController = {
    getCategories,
    createCategory,
};
