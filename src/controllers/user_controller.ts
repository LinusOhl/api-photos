/**
 * User Controller
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { JwtPayload } from "../types";
import { createUser, getUserByEmail } from "./../services/user_service";

// Create a new debug instance
const debug = Debug("prisma-photos:user_controller");

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {
  // Check for any validation errors
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).send({
      status: "fail",
      data: validationErrors.array(),
    });
  }

  // Get only the validated data from the request
  const validatedData = matchedData(req);
  console.log("validatedData:", validatedData);

  // Calculate a hash + salt for the password
  const hashedPassword = await bcrypt.hash(
    validatedData.password,
    Number(process.env.SALT_ROUNDS || 10)
  );
  console.log("Hashed password:", hashedPassword);

  // Replace password with hashed password
  validatedData.password = hashedPassword;

  // Store the user in the database
  try {
    const user = await createUser({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: validatedData.email,
      password: validatedData.password,
    });

    // Respond with 201 Created + status success
    res.status(201).send({
      status: "success",
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Could not create user in database",
    });
  }
};

/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => {
  // destructure email and password from request body
  const { email, password } = req.body;

  // find user with email, otherwise bail
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).send({
      status: "fail",
      message: "Authorization required",
    });
  }

  // verify credentials against hash, otherwise bail
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    return res.status(401).send({
      status: "fail",
      message: "Authorization required",
    });
  }

  // construct jwt-payload
  const payload: JwtPayload = {
    sub: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };

  // sign payload with access-token secret and get access-token
  if (!process.env.ACCESS_TOKEN_SECRET) {
    return res.status(500).send({
      status: "error",
      message: "No access-token secret defined",
    });
  }

  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "4h",
  });

  // sign payload with refresh-token secret and get refresh-token
  if (!process.env.REFRESH_TOKEN_SECRET) {
    return res.status(500).send({
      status: "error",
      message: "No refresh-token secret defined",
    });
  }

  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME || "1d",
  });

  res.send({
    status: "success",
    data: {
      access_token,
      refresh_token,
    },
  });
};

/**
 * Refresh token
 *
 * Receives a refresh-token and issues a new access-token
 *
 * Authorization: Bearer <refresh-token>
 */
export const refresh = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    debug("Authorization header missing!");

    return res.status(401).send({
      status: "fail",
      data: "Authorization missing",
    });
  }

  const [authSchema, token] = req.headers.authorization.split(" ");

  if (authSchema.toLocaleLowerCase() !== "bearer") {
    debug("Authorization schema isn't bearer!");

    return res.status(401).send({
      status: "fail",
      data: "Authorization required",
    });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET || ""
    ) as unknown as JwtPayload;

    delete payload.iat;
    delete payload.exp;

    // sign payload with access-token secret and get access-token
    if (!process.env.ACCESS_TOKEN_SECRET) {
      return res.status(500).send({
        status: "error",
        message: "No access-token secret defined",
      });
    }

    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "4h",
    });

    res.send({
      status: "success",
      data: {
        access_token,
      },
    });
  } catch (err) {
    debug("Token failed verification", err);

    return res.status(401).send({
      status: "fail",
      data: "Authorization required",
    });
  }
};
