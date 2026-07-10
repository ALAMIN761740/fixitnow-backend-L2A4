import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { serviceService } from "./service.service";
import ApiError from "../../utils/apiError";
import { AuthenticatedRequest } from "../../middlewares/auth";

const getServices = catchAsync(async (req: Request, res: Response) => {
    const services = await serviceService.getServices();

    res.status(200).json({ success: true, message: "Services fetched successfully", data: services });
});

const createService = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const service = await serviceService.createService(req.user!.id, req.body);

    res.status(201).json({ success: true, message: "Service created successfully", data: service });
});

export const serviceController = {
    getServices,
    createService,
};
