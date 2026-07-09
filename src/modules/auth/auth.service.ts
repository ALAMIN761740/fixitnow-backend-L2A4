import prisma from "../../config/db";
import ApiError from "../../utils/apiError";
import { comparePassword, hashPassword } from "../../utils/hashPassword";
import { generateToken } from "./jwt";

interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
    phone?: string;
    address?: string;
}

interface LoginInput {
    email: string;
    password: string;
}

const registerUser = async (payload: RegisterInput) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (existingUser) {
        throw new ApiError(409, "A user with this email already exists");
    }

    const hashedPassword = await hashPassword(payload.password);

    const user = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role,
            phone: payload.phone,
            address: payload.address,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            address: true,
            createdAt: true,
        },
    });

    return user;
};

const loginUser = async (payload: LoginInput) => {
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await comparePassword(payload.password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken({ id: user.id, role: user.role });

    return {
        accessToken: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        },
    };
};

const getMe = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            address: true,
            status: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

const seedAdmin = async () => {
    const adminExists = await prisma.user.findFirst({
        where: { role: "ADMIN" },
    });

    if (adminExists) {
        return { message: "Admin already exists" };
    }

    const password = await hashPassword("admin123");
    const admin = await prisma.user.create({
        data: {
            name: "System Admin",
            email: "admin@fixitnow.com",
            password,
            role: "ADMIN",
        },
    });

    return { message: "Admin created", adminId: admin.id };
};

export const authService = {
    registerUser,
    loginUser,
    getMe,
    seedAdmin,
};