import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import { AuthenticatedRequest } from "../../middlewares/auth";

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.registerUser(req.body);

    res.status(201).json({ success: true, message: "User registered successfully", data: user });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.loginUser(req.body);

    res.status(200).json({ success: true, message: "Login successful", data: result });
});

const getMe = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const user = await userService.getMe(req.user!.id);

    res.status(200).json({ success: true, message: "Profile fetched successfully", data: user });
});

const seedAdmin = catchAsync(async (_req: Request, res: Response) => {
    const result = await userService.seedAdmin();

    res.status(200).json({ success: true, message: "Admin seeded successfully", data: result });
});

export const userController = {
    registerUser,
    loginUser,
    getMe,
    seedAdmin,
};
