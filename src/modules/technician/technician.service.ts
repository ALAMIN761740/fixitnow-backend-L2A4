import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import type { TechnicianProfileInput } from "./technician.interface";

const createOrUpdateProfile = async (userId: string, payload: TechnicianProfileInput) => {
    const existing = await prisma.technicianProfile.findUnique({ where: { userId } });

    // sanitize payload to match Prisma expected types (avoid null where not allowed)
    const updateData: any = { ...payload };
    const createData: any = { userId, ...payload };

    if (updateData.skills == null) delete updateData.skills;
    if (createData.skills == null) delete createData.skills;

    const profile = await prisma.technicianProfile.upsert({ where: { userId }, update: updateData, create: createData });

    return { profile, wasCreated: !existing };
};

const getTechnicians = async () => {
    return prisma.technicianProfile.findMany({ include: { user: { select: { id: true, name: true, email: true } }, services: true } });
};

const getTechnicianById = async (technicianId: string) => {
    const technician = await prisma.technicianProfile.findUnique({ where: { id: technicianId }, include: { user: true, services: true, reviews: true } });
    if (!technician) throw new ApiError(404, "Technician not found");
    return technician;
};

const getMyBookings = async (userId: string) => {
    const profile = await prisma.technicianProfile.findUnique({ where: { userId } });
    if (!profile) throw new ApiError(404, "Technician profile not found");

    return prisma.booking.findMany({ where: { technicianId: profile.id }, include: { customer: true, service: true, payment: true }, orderBy: { createdAt: "desc" } });
};

const updateBookingStatus = async (userId: string, bookingId: string, status: string) => {
    const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
    if (!technicianProfile) throw new ApiError(404, "Technician profile not found");

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw new ApiError(404, "Booking not found");
    if (booking.technicianId !== technicianProfile.id) throw new ApiError(403, "You can only update your own bookings");

    const updated = await prisma.booking.update({ where: { id: bookingId }, data: { status: status as any } });
    return updated;
};

const addAvailability = async (userId: string, payload: any) => {
    const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
    if (!technicianProfile) throw new ApiError(404, "Technician profile not found");

    const availability = await prisma.availability.create({ data: { technicianId: technicianProfile.id, ...payload } });
    return availability;
};

export const technicianService = {
    createOrUpdateProfile,
    getTechnicians,
    getTechnicianById,
    getMyBookings,
    updateBookingStatus,
    addAvailability,
};
