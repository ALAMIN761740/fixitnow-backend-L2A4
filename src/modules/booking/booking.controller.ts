import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import ApiError from "../../utils/apiError";
import { AuthenticatedRequest } from "../../middlewares/auth";

const createBooking = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const booking = await bookingService.createBooking(req.user!.id, req.body);

    res.status(201).json({ success: true, message: "Booking created successfully", data: booking });
});

const getMyBookings = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const bookings = await bookingService.getMyBookings(req.user!.id);

    res.status(200).json({ success: true, message: "Bookings fetched successfully", data: bookings });
});

const updateBookingStatus = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const bookingId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!bookingId) throw new ApiError(400, "Invalid booking id");

    const updated = await bookingService.updateBookingStatus(bookingId, req.body.status);

    res.status(200).json({ success: true, message: "Booking status updated successfully", data: updated });
});

export const bookingController = {
    createBooking,
    getMyBookings,
    updateBookingStatus,
};
