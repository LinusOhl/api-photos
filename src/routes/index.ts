import express from "express";
import { register, login, refresh } from "../controllers/user_controller";

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
