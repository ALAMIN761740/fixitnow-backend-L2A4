export interface ServiceCreateInput {
    title: string;
    description?: string | null;
    price: number;
    categoryId?: string | null;
}

export interface ServiceDTO {
    id: string;
    title: string;
    description?: string | null;
    price: number;
    categoryId?: string | null;
    technicianId?: string | null;
}
