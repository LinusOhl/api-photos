/**
 * Photo Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../prisma";
import { getUserByEmail } from "../services/user_service";

// Create a new debug instance
const debug = Debug("prisma-photos:photo_controller");

/**
 * Get all photos
 */
export const index = async (req: Request, res: Response) => {
  // const profile = getUserByEmail(req.token!.email);
  console.log(req.token);

  try {
    const photos = await prisma.photo.findMany({
      where: {
        userId: req.token!.sub,
      },
    });

    res.send({
      status: "success",
      data: photos,
    });
  } catch (err) {
    debug("Error thrown when finding photos", err);

    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Get a single photo
 */
export const show = async (req: Request, res: Response) => {
  const photoId = Number(req.params.photoId);
  try {
    const photo = await prisma.photo.findFirst({
      where: {
        id: photoId,
        userId: req.token!.sub,
      },
    });

    res.send({
      status: "success",
      data: photo,
    });
  } catch (err) {
    debug(
      "Error thrown when finding photo with id %o: %o",
      req.params.bookId,
      err
    );
    return res.status(404).send({ status: "error", message: "Not found" });
  }
};

/**
 * Create a new photo
 */
export const store = async (req: Request, res: Response) => {
  try {
    const photo = await prisma.photo.create({
      data: {
        title: req.body.title,
        url: req.body.url,
        comment: req.body.comment,
        userId: req.token!.sub,
      },
    });

    res.send({
      status: "success",
      data: photo,
    });
  } catch (err) {
    debug("Error thrown when creating a photo %o: %o", req.body, err);

    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Update a photo
 */
export const update = async (req: Request, res: Response) => {};

/**
 * Delete a photo
 */
export const destroy = async (req: Request, res: Response) => {};
