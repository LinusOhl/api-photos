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
    debug("Error thrown when creating a photo %o: %o", req.body, err);

    res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

/**
 * Update an album
 */
export const updateAlbum = async (req: Request, res: Response) => {};

/**
 * Add photos to an album
 */
export const addPhotos = async (req: Request, res: Response) => {};

/**
 * Remove a photo from an album
 */
export const removePhoto = async (req: Request, res: Response) => {};

/**
 * Delete an album
 */
export const deleteAlbum = async (req: Request, res: Response) => {};
