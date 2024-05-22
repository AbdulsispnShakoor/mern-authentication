import express from 'express';
import { changePasswordController, loginController, profileController, registerController } from '../controllers/user.controller.js';
import { protectMiddleware } from '../middlewares/protectMiddleware.js';
const router = express.Router();

router.post("/register", registerController)
router.post("/login", loginController)
router.post("/change-password", protectMiddleware,changePasswordController)
router.get("/profile", protectMiddleware,profileController)

export default router