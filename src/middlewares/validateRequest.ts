import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/apiError";

const validateRequest = (schema: ZodType) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorDetails = error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                }));
                return next(new ApiError(400, "Validation failed", errorDetails));
            }
            return next(error);
        }
    });
};

export default validateRequest;