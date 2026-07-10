export interface CategoryCreateInput {
    name: string;
    description?: string | null;
}

export interface CategoryDTO {
    id: string;
    name: string;
    description?: string | null;
    createdAt?: Date;
}
