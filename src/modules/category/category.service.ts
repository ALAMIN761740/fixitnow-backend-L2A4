import prisma from "../../config/db";
import type { CategoryCreateInput, CategoryDTO } from "./category.interface";

const getCategories = async (): Promise<CategoryDTO[]> => {
    return prisma.category.findMany({ orderBy: { name: "asc" } });
};

const createCategory = async (payload: CategoryCreateInput): Promise<CategoryDTO> => {
    const category = await prisma.category.create({ data: payload });
    return category as CategoryDTO;
};

export const categoryService = {
    getCategories,
    createCategory,
};
