import { z } from "zod";

const createReviewSchema = z.object({
    body: z.object({
        bookingId: z.string().min(1, "Booking id is required"),
        rating: z.number().int().min(1).max(5),
        comment: z.string().optional(),
    }),
});

export const reviewValidation = { createReviewSchema };
