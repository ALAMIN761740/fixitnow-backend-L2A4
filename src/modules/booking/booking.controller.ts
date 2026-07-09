import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import { AuthenticatedRequest } from "../../middlewares/auth";

const createBooking = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const { technicianId, serviceId, scheduledAt, customerNote } = req.body;

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
        throw new ApiError(404, "Service not found");
    }

    const booking = await prisma.booking.create({
        data: {
            customerId: req.user!.id,
            technicianId,
            serviceId,
            scheduledAt: new Date(scheduledAt),
            customerNote,
            totalAmount: service.price,
        },
    });

    res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking,
    });
});

const getMyBookings = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const bookings = await prisma.booking.findMany({
        where: { customerId: req.user!.id },
        include: { service: true, technician: true, payment: true },
        orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
        success: true,
        message: "Bookings fetched successfully",
        data: bookings,
    });
});

const updateBookingStatus = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const bookingId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!bookingId) {
        throw new ApiError(400, "Invalid booking id");
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    const updated = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: req.body.status },
    });

    res.status(200).json({
        success: true,
        message: "Booking status updated successfully",
        data: updated,
    });
});

export const bookingController = {
    createBooking,
    getMyBookings,
    updateBookingStatus,
};
