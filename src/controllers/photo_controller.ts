/**
 * Photo Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../prisma";

// Create a new debug instance
const debug = Debug("prisma-photos:photo_controller");

/**
 * Get all photos
 */
export const getAllPhotos = async (req: Request, res: Response) => {
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
    debug("Error thrown when getting all photos:", err);

    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Get a single photo
 */
export const getPhoto = async (req: Request, res: Response) => {
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
      data: {
        id: photoId,
        title: photo?.title,
        url: photo?.url,
        comment: photo?.comment,
      },
    });
  } catch (err) {
    debug("Error thrown when getting a photo by id:", err);

    res.status(404).send({ status: "error", message: "Not found" });
  }
};

/**
 * Create a new photo
 */
export const createPhoto = async (req: Request, res: Response) => {
  try {
    const photo = await prisma.photo.create({
      data: {
        title: req.body.title,
        url: req.body.url,
        comment: req.body.comment,
        user: {
          connect: {
            id: req.token!.sub,
          },
        },
      },
    });

    res.send({
      status: "success",
      data: photo,
    });
  } catch (err) {
    debug("Error thrown when creating a new photo:", err);

    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Update a photo
 */
export const updatePhoto = async (req: Request, res: Response) => {
  const photoId = Number(req.params.photoId);

  try {
    const photo = await prisma.photo.updateMany({
      where: {
        id: photoId,
        userId: req.token!.sub,
      },
      data: {
        title: req.body.title,
        url: req.body.url,
        comment: req.body.comment,
      },
    });

    const changedPhoto = await prisma.photo.findMany({
      where: {
        id: photoId,
        userId: req.token!.sub,
      },
    });

    res.send({
      status: "success",
      data: changedPhoto,
    });
  } catch (err) {
    debug("Error thrown when updating a photo:", err);

    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Delete a photo
 */
export const deletePhoto = async (req: Request, res: Response) => {
  const photo = await prisma.photo.findUnique({
    where: {
      id: Number(req.params.photoId),
    },
    include: {
      albums: {
        select: {
          id: true,
        },
      },
    },
  });

  try {
    if (photo?.userId !== req.token!.sub) {
      return res.status(401).send({
        status: "fail",
        message: "Unauthorized",
      });
    }

    await prisma.photo.update({
      where: {
        id: photo.id,
      },
      data: {
        albums: {
          disconnect: photo.albums,
        },
      },
    });

    const result = await prisma.photo.delete({
      where: {
        id: photo.id,
      },
    });

    res.send({
      status: "success",
      data: result,
    });
  } catch (err) {
    debug("Error thrown when deleting a photo:", err);
    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};
