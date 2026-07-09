import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import { verifyToken } from "../modules/auth/jwt";
import prisma from "../config/db";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        role: string;
        email: string;
        name: string;
    };
}

export const auth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return next(new ApiError(401, "Authorization token is required"));
    }

    const token = authHeader.split(" ")[1];

    try {
        if (!token) {
            return next(new ApiError(401, "Authorization token is required"));
        }

        const payload = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
            },
        });

        if (!user) {
            return next(new ApiError(401, "User not found"));
        }

        if (user.status === "BANNED") {
            return next(new ApiError(403, "Your account has been banned"));
        }

        req.user = {
            id: user.id,
            role: user.role,
            email: user.email,
            name: user.name,
        };

        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid or expired token"));
    }
};

export const authorizeRoles = (...roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ApiError(401, "Authentication required"));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, "You do not have permission to access this resource"));
        }

        next();
    };
};
