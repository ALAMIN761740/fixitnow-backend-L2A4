import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import type { ServiceCreateInput } from "./service.interface";

const getServices = async () => {
    return prisma.service.findMany({ include: { category: true, technician: true }, orderBy: { title: "asc" } });
};

const createService = async (userId: string, payload: ServiceCreateInput) => {
    const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
    if (!technicianProfile) throw new ApiError(403, "Technician profile is required before creating services");

    const createData: any = {
        technicianId: technicianProfile.id,
        title: payload.title,
        description: payload.description ?? null,
        price: payload.price,
    };

    if (payload.categoryId) createData.categoryId = payload.categoryId;

    const service = await prisma.service.create({ data: createData });
    return service;
};

export const serviceService = { getServices, createService };
