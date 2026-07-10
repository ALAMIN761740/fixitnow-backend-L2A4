import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { reviewService } from "./review.service";
import ApiError from "../../utils/apiError";
import { AuthenticatedRequest } from "../../middlewares/auth";

const createReview = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const review = await reviewService.createReview(req.user!.id, req.body);

    res.status(201).json({ success: true, message: "Review created successfully", data: review });
});

export const reviewController = {
    createReview,
};
