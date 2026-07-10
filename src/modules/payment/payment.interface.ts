export interface CreatePaymentInput {
    bookingId: string;
}

export interface PaymentDTO {
    id: string;
    bookingId: string;
    amount: number;
    provider: string;
    status: string;
    transactionId?: string | null;
}
