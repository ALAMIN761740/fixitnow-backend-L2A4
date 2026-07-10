import { z } from "zod";

const profileSchema = z.object({
    body: z.object({
        bio: z.string().optional(),
        experienceYears: z.number().int().nonnegative().optional(),
        skills: z.array(z.string()).optional(),
    }),
});

const availabilitySchema = z.object({
    body: z.object({
        day: z.string().min(1),
        from: z.string().min(1),
        to: z.string().min(1),
    }),
});

const updateBookingStatusSchema = z.object({
    params: z.object({ id: z.string().min(1, "Booking id is required") }),
    body: z.object({
        status: z.enum([
            "REQUESTED",
            "ACCEPTED",
            "DECLINED",
            "PAID",
            "IN_PROGRESS",
            "COMPLETED",
            "CANCELLED",
        ]),
    }),
});

export const technicianValidation = { profileSchema, availabilitySchema, updateBookingStatusSchema };
