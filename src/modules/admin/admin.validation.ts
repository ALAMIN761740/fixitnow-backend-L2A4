import { z } from "zod";

const updateUserStatusSchema = z.object({
    params: z.object({ id: z.string().min(1, "User id is required") }),
    body: z.object({ status: z.enum(["ACTIVE", "BANNED"]) }),
});

export const adminValidation = { updateUserStatusSchema };
