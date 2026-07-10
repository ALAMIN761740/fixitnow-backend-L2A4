import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorDetails: unknown = undefined;

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errorDetails = err.errorDetails ?? err.message;
    } else if (err instanceof Error) {
        message = err.message || message;
        // Do not expose internal error details in production
        errorDetails = process.env.NODE_ENV === "production" ? undefined : err.message;
    }

    const payload: any = { success: false, message };
    if (errorDetails !== undefined) payload.errorDetails = errorDetails;

    res.status(statusCode).json(payload);
};

export default errorHandler;