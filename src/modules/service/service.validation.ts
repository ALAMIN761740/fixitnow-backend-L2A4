import { z } from "zod";

const createServiceSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        price: z.number().positive("Price must be a positive number"),
        categoryId: z.string().optional(),
    }),
});

export const serviceValidation = { createServiceSchema };
