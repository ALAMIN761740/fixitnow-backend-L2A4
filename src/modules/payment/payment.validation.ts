import { z } from "zod";

const createPaymentSchema = z.object({ body: z.object({ bookingId: z.string().min(1, "Booking id is required") }) });

const confirmPaymentSchema = z.object({ body: z.object({ transactionId: z.string().min(1, "Transaction id is required") }) });

export const paymentValidation = { createPaymentSchema, confirmPaymentSchema };
