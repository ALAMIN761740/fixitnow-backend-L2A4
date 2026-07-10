import { userService } from "../user/user.service";

// authService delegates user-related operations to userService
export const authService = userService;