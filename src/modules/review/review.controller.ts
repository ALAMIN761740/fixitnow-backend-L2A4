import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import { AuthenticatedRequest } from "../../middlewares/auth";

const createReview = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const { bookingId, rating, comment } = req.body;

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    if (booking.customerId !== req.user!.id) {
        throw new ApiError(403, "You can only review your own bookings");
    }

    const review = await prisma.review.create({
        data: {
            bookingId,
            customerId: req.user!.id,
            technicianId: booking.technicianId,
            rating,
            comment,
        },
    });

    res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: review,
    });
});

export const reviewController = {
    createReview,
};
