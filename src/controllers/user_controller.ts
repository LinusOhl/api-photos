/**
 * User Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../prisma";

// Create a new debug instance
const debug = Debug("prisma-photos:user_controller");

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {};

/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => {};

/**
 * Refresh token
 *
 * Receives a refresh-token and issues a new access-token
 *
 * Authorization: Bearer <refresh-token>
 */
export const refresh = async (req: Request, res: Response) => {};
