export interface CreateBookingInput {
    technicianId: string;
    serviceId: string;
    scheduledAt: string | Date;
    customerNote?: string | null;
}

export interface BookingDTO {
    id: string;
    customerId: string;
    technicianId: string;
    serviceId: string;
    scheduledAt: Date;
    totalAmount?: number | null;
    status?: string;
    createdAt?: Date;
}
