/**
 * Album Router
 */
import express from "express";
import {
  getAllAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  addPhotos,
  removePhoto,
  deleteAlbum,
} from "../controllers/album_controller";
import {
  createAlbumRules,
  updateAlbumRules,
  addPhotoRules,
} from "../validations/album_rules";
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
router.post("/", createAlbumRules, createAlbum);

/**
 * PATCH /albums/:albumId
 */
router.patch("/:albumId", updateAlbumRules, updateAlbum);

/**
 * POST /albums/:albumId/photos
 */
router.post("/:albumId/photos", addPhotoRules, addPhotos);

/**
 * DELETE /albums/:albumId/photos/:photoId
 */
router.delete("/:albumId/photos/:photoId", removePhoto);

/**
 * DELETE /albums/:albumId
 */
router.delete("/:albumId", deleteAlbum);

export default router;
