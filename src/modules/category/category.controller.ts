import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import prisma from "../../config/db";

const getCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
    });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await prisma.category.create({
        data: req.body,
    });

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
    });
});

export const categoryController = {
    getCategories,
    createCategory,
};
