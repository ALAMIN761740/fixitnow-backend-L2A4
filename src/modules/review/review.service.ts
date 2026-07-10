import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import type { CreateReviewInput } from "./review.interface";

const createReview = async (userId: string, payload: CreateReviewInput) => {
    const { bookingId, rating, comment } = payload;

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw new ApiError(404, "Booking not found");
    if (booking.customerId !== userId) throw new ApiError(403, "You can only review your own bookings");

    const existingReview = await prisma.review.findUnique({ where: { bookingId } });
    if (existingReview) throw new ApiError(400, "You already reviewed this booking");

    const review = await prisma.review.create({ data: { bookingId, customerId: userId, technicianId: booking.technicianId, rating, comment } });

    return review;
};

export const reviewService = { createReview };
