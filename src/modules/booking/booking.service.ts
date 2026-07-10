import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import type { CreateBookingInput, BookingDTO } from "./booking.interface";

const createBooking = async (userId: string, payload: CreateBookingInput): Promise<BookingDTO> => {
    const service = await prisma.service.findUnique({ where: { id: payload.serviceId } });
    if (!service) throw new ApiError(404, "Service not found");

    const booking = await prisma.booking.create({
        data: {
            customerId: userId,
            technicianId: payload.technicianId,
            serviceId: payload.serviceId,
            scheduledAt: new Date(payload.scheduledAt),
            customerNote: payload.customerNote,
            totalAmount: service.price,
        },
    });

    return booking as BookingDTO;
};

const getMyBookings = async (userId: string) => {
    return prisma.booking.findMany({
        where: { customerId: userId },
        include: { service: true, technician: true, payment: true },
        orderBy: { createdAt: "desc" },
    });
};

const updateBookingStatus = async (bookingId: string, status: string) => {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw new ApiError(404, "Booking not found");

    const updated = await prisma.booking.update({ where: { id: bookingId }, data: { status: status as any } });
    return updated;
};

export const bookingService = {
    createBooking,
    getMyBookings,
    updateBookingStatus,
};
