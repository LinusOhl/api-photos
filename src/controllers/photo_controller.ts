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
export const index = async (req: Request, res: Response) => {};

/**
 * Get a single photo
 */
export const show = async (req: Request, res: Response) => {};

/**
 * Create a new photo
 */
export const store = async (req: Request, res: Response) => {};

/**
 * Update a photo
 */
export const update = async (req: Request, res: Response) => {};

/**
 * Delete a photo
 */
export const destroy = async (req: Request, res: Response) => {};
