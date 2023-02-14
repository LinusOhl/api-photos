/**
 * Router Template
 */
import express from "express";
import { body } from "express-validator";
import { register, login, refresh } from "../controllers/user_controller";
const router = express.Router();

/**
 * POST /register
 */
router.post("/register", register);

/**
 * POST /login
 */
router.post("/login", login);

/**
 * POST /refresh
 */
router.post("/refresh", refresh);

export default router;
