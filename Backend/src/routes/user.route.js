import { Router } from "express";
import { register, login, logout } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
