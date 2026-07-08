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
    let errorDetails: unknown = err;

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errorDetails = err.errorDetails ?? err.message;
    } else if (err instanceof Error) {
        message = err.message;
        errorDetails = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorDetails,
    });
};

export default errorHandler;