import { z } from "zod";

const registerValidationSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        role: z.enum(["CUSTOMER", "TECHNICIAN", "ADMIN"]),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email format"),
        password: z.string(),
    }),
});

export const authValidation = {
    registerValidationSchema,
    loginValidationSchema,
};