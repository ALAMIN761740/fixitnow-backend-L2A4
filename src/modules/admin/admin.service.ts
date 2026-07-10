import prisma from "../../config/db";
import ApiError from "../../utils/apiError";

const getUsers = async () => {
    return prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, phone: true, address: true, profileImage: true, status: true, createdAt: true, updatedAt: true }, orderBy: { createdAt: "desc" } });
};

const updateUserStatus = async (userId: string, status: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError(404, "User not found");

    const updated = await prisma.user.update({
        where: { id: userId },
        // cast status to any to satisfy Prisma enum typing at compile time
        data: { status: status as any },
        select: { id: true, name: true, email: true, role: true, phone: true, address: true, profileImage: true, status: true, createdAt: true, updatedAt: true },
    });

    return updated;
};

const getAllBookings = async () => {
    return prisma.booking.findMany({ include: { customer: { select: { id: true, name: true, email: true, role: true, phone: true, address: true, profileImage: true, status: true } }, technician: true, service: true, payment: true }, orderBy: { createdAt: "desc" } });
};

export const adminService = { getUsers, updateUserStatus, getAllBookings };
