import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import ApiError from "../../utils/apiError";

const getUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await adminService.getUsers();

    res.status(200).json({ success: true, message: "Users fetched successfully", data: users });
});


const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!userId) throw new ApiError(400, "Invalid user id");

    const updated = await adminService.updateUserStatus(userId, req.body.status);

    res.status(200).json({ success: true, message: "User status updated successfully", data: updated });
});


const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const bookings = await adminService.getAllBookings();

    res.status(200).json({ success: true, message: "All bookings fetched successfully", data: bookings });
});


export const adminController = {
    getUsers,
    updateUserStatus,
    getAllBookings,
};