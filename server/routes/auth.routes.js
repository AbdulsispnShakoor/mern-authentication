import express from 'express';
import { changePasswordController, forgotPassword, loginController, passwordReset, profileController, registerController } from '../controllers/user.controller.js';
import { protectMiddleware, restriction } from '../middlewares/protectMiddleware.js';
const router = express.Router();

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/profile", protectMiddleware,restriction("admin"),profileController)
router.post("/forgot-password", forgotPassword)
router.patch("/password-reset/:token", passwordReset)

export default router