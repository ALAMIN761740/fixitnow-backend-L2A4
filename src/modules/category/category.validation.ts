import { z } from "zod";

const createCategorySchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().optional(),
    }),
});

export const categoryValidation = { createCategorySchema };
