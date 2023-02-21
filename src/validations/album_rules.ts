/**
 * Validation Rules for Album resource
 */
import { body } from "express-validator";

export const createAlbumRules = [
  body("title")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Has to be a string and at least 3 chars long."),
];

export const updateAlbumRules = [
  body("title")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Has to be a string and at least 3 chars long."),
];

export const addPhotoRules = [
  body("photoIds.*").isInt().withMessage("Has to be an array of int."),
];
