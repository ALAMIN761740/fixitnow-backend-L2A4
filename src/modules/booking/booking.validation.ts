import { z } from "zod";

const createBookingSchema = z.object({
    body: z.object({
        technicianId: z.string().min(1, "Technician id is required"),
        serviceId: z.string().min(1, "Service id is required"),
        scheduledAt: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
        customerNote: z.string().optional(),
    }),
});

const updateStatusSchema = z.object({
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

export const bookingValidation = { createBookingSchema, updateStatusSchema };
