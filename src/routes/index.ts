import express from "express";
import photos from "./photos";
import albums from "./albums";
import { register, login, refresh } from "../controllers/user_controller";
import { validateToken } from "../middlewares/auth/jwt";
import { createUserRules } from "../validations/user_rules";

// instantiate a new router
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
  res.send({
    message: "I AM API, BEEP BOOP",
  });
});

router.use("/photos", validateToken, photos);
router.use("/albums", validateToken, albums);

/**
 * POST /register
 */
router.post("/register", createUserRules, register);

/**
 * POST /login
 */
router.post("/login", login);

/**
 * POST /refresh
 */
router.post("/refresh", refresh);

export default router;
