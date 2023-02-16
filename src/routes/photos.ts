/**
 * Photos Router
 */
import express from "express";
import { body } from "express-validator";
import {
  getAllPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from "../controllers/photo_controller";
const router = express.Router();

/**
 * GET /photos
 */
router.get("/", getAllPhotos);

/**
 * GET /photos/:photoId
 */
router.get("/:photoId", getPhoto);

/**
 * POST /photos
 */
router.post("/", [], createPhoto);

/**
 * PATCH /photos/:photoId
 */
router.patch("/:photoId", [], updatePhoto);

/**
 * DELETE /photos/:photoId
 */
router.delete("/:photoId", deletePhoto);

export default router;
