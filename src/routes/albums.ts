/**
 * Router Template
 */
import express from "express";
import { body } from "express-validator";
import {
  index,
  show,
  store,
  update,
  addPhoto,
  removePhoto,
  destroy,
} from "../controllers/album_controller";
const router = express.Router();

/**
 * GET /albums
 */
router.get("/", index);

/**
 * GET /albums/:albumId
 */
router.get("/:albumId", show);

/**
 * POST /albums
 */
router.post("/", [], store);

/**
 * PATCH /albums/:albumId
 */
router.patch("/:albumId", [], update);

/**
 * POST /albums/:albumId/photos
 */
router.post("/:albumId/photos", [], addPhoto);

/**
 * DELETE /albums/:albumId/photos/:photoId
 */
router.delete("/:albumId/photos/:photoId", removePhoto);

/**
 * DELETE /albums/:albumId
 */
router.delete("/:albumId", destroy);

export default router;
