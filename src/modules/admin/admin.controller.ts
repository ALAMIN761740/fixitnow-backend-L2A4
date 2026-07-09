import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import prisma from "../../config/db";
import ApiError from "../../utils/apiError";

const getUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
    });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!userId) {
        throw new ApiError(400, "Invalid user id");
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const updated = await prisma.user.update({
        where: { id: userId },
        data: { status: req.body.status },
    });

    res.status(200).json({
        success: true,
        message: "User status updated successfully",
        data: updated,
    });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const bookings = await prisma.booking.findMany({
        include: { customer: true, technician: true, service: true, payment: true },
        orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
        success: true,
        message: "All bookings fetched successfully",
        data: bookings,
    });
});

export const adminController = {
    getUsers,
    updateUserStatus,
    getAllBookings,
};
