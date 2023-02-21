/**
 * Validation Rules for Photo resource
 */
import { body } from "express-validator";

export const createPhotoRules = [
  body("title")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Has to be a string and at least 3 chars long."),
  body("url").isURL().withMessage("Has to be a valid url."),
  body("comment")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Has to be a string and at least 3 chars long."),
];

export const updatePhotoRules = [
  body("title")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Has to be a string and at least 3 chars long."),
  body("url").optional().isURL().withMessage("Has to be a valid url."),
  body("comment")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Has to be a string and at least 3 chars long."),
];
