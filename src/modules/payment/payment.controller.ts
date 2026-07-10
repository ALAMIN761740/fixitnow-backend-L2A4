import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import ApiError from "../../utils/apiError";
import { AuthenticatedRequest } from "../../middlewares/auth";

const createPayment = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const { bookingId } = req.body;

    const result = await paymentService.createPayment(req.user!.id, bookingId);

    res.status(201).json({ success: true, message: "Payment session created", data: result });
});

const confirmPayment = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const { transactionId } = req.body;
    const updatedPayment = await paymentService.confirmPayment(transactionId);

    res.status(200).json({ success: true, message: "Payment confirmed successfully", data: updatedPayment });
});

const getMyPayments = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const payments = await paymentService.getMyPayments(req.user!.id);

    res.status(200).json({ success: true, message: "Payments fetched successfully", data: payments });
});

export const paymentController = {
    createPayment,
    confirmPayment,
    getMyPayments,
};
