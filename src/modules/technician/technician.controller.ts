import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import { AuthenticatedRequest } from "../../middlewares/auth";

const createOrUpdateProfile = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const existing = await prisma.technicianProfile.findUnique({
        where: { userId: req.user!.id },
    });

    const profile = await prisma.technicianProfile.upsert({
        where: { userId: req.user!.id },
        update: req.body,
        create: {
            userId: req.user!.id,
            ...req.body,
        },
    });

    res.status(existing ? 200 : 201).json({
        success: true,
        message: "Technician profile saved successfully",
        data: profile,
    });
});

const getTechnicians = catchAsync(async (req: Request, res: Response) => {
    const technicians = await prisma.technicianProfile.findMany({
        include: {
            user: {
                select: { id: true, name: true, email: true },
            },
            services: true,
        },
    });

    res.status(200).json({
        success: true,
        message: "Technicians fetched successfully",
        data: technicians,
    });
});

const getTechnicianById = catchAsync(async (req: Request, res: Response) => {
    const technicianId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!technicianId) {
        throw new ApiError(400, "Invalid technician id");
    }

    const technician = await prisma.technicianProfile.findUnique({
        where: { id: technicianId },
        include: {
            user: true,
            services: true,
            reviews: true,
        },
    });

    if (!technician) {
        throw new ApiError(404, "Technician not found");
    }

    res.status(200).json({
        success: true,
        message: "Technician fetched successfully",
        data: technician,
    });
});

const getMyBookings = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const profile = await prisma.technicianProfile.findUnique({ where: { userId: req.user!.id } });
    if (!profile) {
        throw new ApiError(404, "Technician profile not found");
    }

    const bookings = await prisma.booking.findMany({
        where: { technicianId: profile.id },
        include: { customer: true, service: true, payment: true },
        orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
        success: true,
        message: "Technician bookings fetched successfully",
        data: bookings,
    });
});

const updateBookingStatus = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const bookingId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!bookingId) {
        throw new ApiError(400, "Invalid booking id");
    }

    const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId: req.user!.id } });
    if (!technicianProfile) {
        throw new ApiError(404, "Technician profile not found");
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    if (booking.technicianId !== technicianProfile.id) {
        throw new ApiError(403, "You can only update your own bookings");
    }

    const updated = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: req.body.status },
    });

    res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        data: updated,
    });
});

const addAvailability = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId: req.user!.id } });
    if (!technicianProfile) {
        throw new ApiError(404, "Technician profile not found");
    }

    const availability = await prisma.availability.create({
        data: {
            technicianId: technicianProfile.id,
            ...req.body,
        },
    });

    res.status(201).json({
        success: true,
        message: "Availability added successfully",
        data: availability,
    });
});

export const technicianController = {
    createOrUpdateProfile,
    getTechnicians,
    getTechnicianById,
    getMyBookings,
    updateBookingStatus,
    addAvailability,
};
