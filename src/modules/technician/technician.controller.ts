import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { technicianService } from "./technician.service";
import ApiError from "../../utils/apiError";
import { AuthenticatedRequest } from "../../middlewares/auth";

const createOrUpdateProfile = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const { profile, wasCreated } = await technicianService.createOrUpdateProfile(req.user!.id, req.body);

    res.status(wasCreated ? 201 : 200).json({ success: true, message: "Technician profile saved successfully", data: profile });
});

const getTechnicians = catchAsync(async (req: Request, res: Response) => {
    const technicians = await technicianService.getTechnicians();

    res.status(200).json({ success: true, message: "Technicians fetched successfully", data: technicians });
});

const getTechnicianById = catchAsync(async (req: Request, res: Response) => {
    const technicianId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!technicianId) throw new ApiError(400, "Invalid technician id");

    const technician = await technicianService.getTechnicianById(technicianId);

    res.status(200).json({ success: true, message: "Technician fetched successfully", data: technician });
});

const getMyBookings = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const bookings = await technicianService.getMyBookings(req.user!.id);

    res.status(200).json({ success: true, message: "Technician bookings fetched successfully", data: bookings });
});

const updateBookingStatus = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const bookingId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!bookingId) throw new ApiError(400, "Invalid booking id");

    const updated = await technicianService.updateBookingStatus(req.user!.id, bookingId, req.body.status);

    res.status(200).json({ success: true, message: "Booking updated successfully", data: updated });
});

const addAvailability = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const availability = await technicianService.addAvailability(req.user!.id, req.body);

    res.status(201).json({ success: true, message: "Availability added successfully", data: availability });
});

export const technicianController = {
    createOrUpdateProfile,
    getTechnicians,
    getTechnicianById,
    getMyBookings,
    updateBookingStatus,
    addAvailability,
};
