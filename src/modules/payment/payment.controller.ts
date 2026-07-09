import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import { AuthenticatedRequest } from "../../middlewares/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-06-24.dahlia",
});

const createPayment = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const { bookingId } = req.body;

    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { payment: true },
    });

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    if (booking.customerId !== req.user!.id) {
        throw new ApiError(403, "You can only pay for your own bookings");
    }

    if (booking.payment) {
        throw new ApiError(409, "Payment already exists for this booking");
    }

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: { name: `FixItNow booking ${booking.id}` },
                    unit_amount: Math.round((booking.totalAmount || 0) * 100),
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/payment/success`,
        cancel_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/payment/cancel`,
    });

    const payment = await prisma.payment.create({
        data: {
            bookingId: booking.id,
            amount: booking.totalAmount || 0,
            provider: "STRIPE",
            status: "PENDING",
            transactionId: session.id,
        },
    });

    res.status(201).json({
        success: true,
        message: "Payment session created",
        data: {
            payment,
            checkoutUrl: session.url,
        },
    });
});

const confirmPayment = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const { transactionId } = req.body;
    const payment = await prisma.payment.findFirst({ where: { transactionId } });

    if (!payment) {
        throw new ApiError(404, "Payment not found");
    }

    const updatedPayment = await prisma.payment.update({
        where: { id: payment.id },
        data: {
            status: "COMPLETED",
            paidAt: new Date(),
        },
    });

    await prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: "PAID" },
    });

    res.status(200).json({
        success: true,
        message: "Payment confirmed successfully",
        data: updatedPayment,
    });
});

const getMyPayments = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const payments = await prisma.payment.findMany({
        where: {
            booking: {
                customerId: req.user!.id,
            },
        },
        include: { booking: true },
        orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
        success: true,
        message: "Payments fetched successfully",
        data: payments,
    });
});

export const paymentController = {
    createPayment,
    confirmPayment,
    getMyPayments,
};
