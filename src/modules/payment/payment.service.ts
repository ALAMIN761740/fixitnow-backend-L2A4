import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-06-24.dahlia" })
    : null;

const createPayment = async (userId: string, bookingId: string) => {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { payment: true } });
    if (!booking) throw new ApiError(404, "Booking not found");
    if (booking.customerId !== userId) throw new ApiError(403, "You can only pay for your own bookings");
    if (booking.payment) throw new ApiError(409, "Payment already exists for this booking");
    if (!stripe) throw new ApiError(500, "Stripe is not configured. Please set STRIPE_SECRET_KEY in your environment.");

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

    const payment = await prisma.payment.create({ data: { bookingId: booking.id, amount: booking.totalAmount || 0, provider: "STRIPE", status: "PENDING", transactionId: session.id } });

    return { payment, checkoutUrl: session.url };
};

const confirmPayment = async (transactionId: string) => {
    const payment = await prisma.payment.findFirst({ where: { transactionId } });
    if (!payment) throw new ApiError(404, "Payment not found");

    const updatedPayment = await prisma.payment.update({ where: { id: payment.id }, data: { status: "COMPLETED", paidAt: new Date() } });

    await prisma.booking.update({ where: { id: payment.bookingId }, data: { status: "PAID" } });

    return updatedPayment;
};

const getMyPayments = async (userId: string) => {
    return prisma.payment.findMany({ where: { booking: { customerId: userId } }, include: { booking: true }, orderBy: { createdAt: "desc" } });
};

export const paymentService = { createPayment, confirmPayment, getMyPayments };
