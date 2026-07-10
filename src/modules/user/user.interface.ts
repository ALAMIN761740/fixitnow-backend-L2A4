export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
    phone?: string;
    address?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    role: string;
    phone?: string | null;
    address?: string | null;
    status?: string | null;
    createdAt?: Date;
}
