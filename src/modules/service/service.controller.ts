import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import { AuthenticatedRequest } from "../../middlewares/auth";

const getServices = catchAsync(async (req: Request, res: Response) => {
    const services = await prisma.service.findMany({
        include: {
            category: true,
            technician: true,
        },
        orderBy: { title: "asc" },
    });

    res.status(200).json({
        success: true,
        message: "Services fetched successfully",
        data: services,
    });
});

const createService = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const technicianProfile = await prisma.technicianProfile.findUnique({
        where: { userId: req.user!.id },
    });

    if (!technicianProfile) {
        throw new ApiError(403, "Technician profile is required before creating services");
    }

    const service = await prisma.service.create({
        data: {
            ...req.body,
            technicianId: technicianProfile.id,
        },
    });

    res.status(201).json({
        success: true,
        message: "Service created successfully",
        data: service,
    });
});

export const serviceController = {
    getServices,
    createService,
};
