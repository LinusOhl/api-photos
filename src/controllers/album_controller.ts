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
export const index = async (req: Request, res: Response) => {};

/**
 * Get a single album
 */
export const show = async (req: Request, res: Response) => {};

/**
 * Create a new album
 */
export const store = async (req: Request, res: Response) => {};

/**
 * Update an album
 */
export const update = async (req: Request, res: Response) => {};

/**
 * Add photos to an album
 */
export const addPhoto = async (req: Request, res: Response) => {};

/**
 * Remove a photo from an album
 */
export const removePhoto = async (req: Request, res: Response) => {};

/**
 * Delete an album
 */
export const destroy = async (req: Request, res: Response) => {};
