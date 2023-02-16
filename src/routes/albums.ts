/**
 * Album Router
 */
import express from "express";
import { body } from "express-validator";
import {
  getAllAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  addPhotos,
  removePhoto,
  deleteAlbum,
} from "../controllers/album_controller";
const router = express.Router();

/**
 * GET /albums
 */
router.get("/", getAllAlbums);

/**
 * GET /albums/:albumId
 */
router.get("/:albumId", getAlbum);

/**
 * POST /albums
 */
router.post("/", [], createAlbum);

/**
 * PATCH /albums/:albumId
 */
router.patch("/:albumId", [], updateAlbum);

/**
 * POST /albums/:albumId/photos
 */
router.post("/:albumId/photos", [], addPhotos);

/**
 * DELETE /albums/:albumId/photos/:photoId
 */
router.delete("/:albumId/photos/:photoId", removePhoto);

/**
 * DELETE /albums/:albumId
 */
router.delete("/:albumId", deleteAlbum);

export default router;
