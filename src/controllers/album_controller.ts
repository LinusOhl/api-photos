/**
 * Album Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../prisma";

// Create a new debug instance
const debug = Debug("prisma-photos:album_controller");

/**
 * Get all albums
 */
export const getAllAlbums = async (req: Request, res: Response) => {
  try {
    const albums = await prisma.album.findMany({
      where: {
        userId: req.token!.sub,
      },
    });

    res.send({
      status: "success",
      data: albums,
    });
  } catch (err) {
    debug("Error thrown when finding albums", err);

    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Get a single album
 */
export const getAlbum = async (req: Request, res: Response) => {
  const albumId = Number(req.params.albumId);
  try {
    const album = await prisma.album.findFirst({
      where: {
        id: albumId,
        userId: req.token!.sub,
      },
      include: {
        photos: true,
      },
    });

    res.send({
      status: "success",
      data: album,
    });
  } catch (err) {
    debug(
      "Error thrown when finding album with id %o: %o",
      req.params.albumId,
      err
    );
    return res.status(404).send({ status: "error", message: "Not found" });
  }
};

/**
 * Create a new album
 */
export const createAlbum = async (req: Request, res: Response) => {
  try {
    const album = await prisma.album.create({
      data: {
        title: req.body.title,
        user: {
          connect: {
            id: req.token!.sub,
          },
        },
      },
    });

    res.send({
      status: "success",
      data: album,
    });
  } catch (err) {
    console.log(req.body, err);
    debug("Error thrown when creating an album %o: %o", req.body, err);

    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Update an album
 */
export const updateAlbum = async (req: Request, res: Response) => {
  const albumId = Number(req.params.albumId);

  try {
    const album = await prisma.album.updateMany({
      where: {
        id: albumId,
        userId: req.token!.sub,
      },
      data: {
        title: req.body.title,
      },
    });

    const changedPhoto = await prisma.album.findFirst({
      where: {
        id: albumId,
        userId: req.token!.sub,
      },
    });

    res.send({
      status: "success",
      data: changedPhoto,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Add photos to an album
 */
export const addPhotos = async (req: Request, res: Response) => {
  console.log("Photos to connect:", req.body.photoIds);
  const photoIds = req.body.photoIds.map((photoId: number) => {
    return {
      id: photoId,
    };
  });
  console.log(photoIds);

  try {
    for (let i = 0; i < photoIds.length; i++) {
      const photo = await prisma.photo.findUnique({
        where: { id: photoIds[i].id },
      });

      if (photo?.userId !== req.token!.sub) {
        return res
          .status(401)
          .send({ status: "fail", message: "Unauthorized" });
      }
    }

    const result = await prisma.album.update({
      where: {
        id: Number(req.params.albumId),
        // userId: req.token!.sub,
      },
      data: {
        photos: {
          connect: photoIds,
        },
      },
    });
    res.send({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.log(req.body, err);
    debug("Error thrown when adding a photo to an album %o: %o", req.body, err);

    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Remove a photo from an album
 */
export const removePhoto = async (req: Request, res: Response) => {
  try {
    const album = await prisma.album.findUnique({
      where: { id: Number(req.params.albumId) },
    });
    const photo = await prisma.photo.findUnique({
      where: { id: Number(req.params.photoId) },
    });

    if (album?.userId && photo?.userId !== req.token!.sub) {
      return res.status(401).send({
        status: "fail",
        message: "Unauthoriezed",
      });
    }

    await prisma.album.update({
      where: {
        id: album?.id,
      },
      data: {
        photos: {
          disconnect: {
            id: photo?.id,
          },
        },
      },
    });

    res.send({
      status: "success",
      data: null,
    });
  } catch (err) {
    debug(
      "Error thrown when removing a photo from an album %o: %o",
      req.body,
      err
    );

    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Delete an album
 */
export const deleteAlbum = async (req: Request, res: Response) => {};
