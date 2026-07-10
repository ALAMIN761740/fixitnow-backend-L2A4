export interface CreateReviewInput {
    bookingId: string;
    rating: number;
    comment?: string | null;
}

export interface ReviewDTO {
    id: string;
    bookingId: string;
    customerId: string;
    technicianId: string;
    rating: number;
    comment?: string | null;
}
