/**
 * Validation Rules for User resource
 */
import { body } from "express-validator";
import { getUserByEmail } from "../services/user_service";

export const createUserRules = [
  body("email")
    .isEmail()
    .custom(async (value: string) => {
      // check if a User with that email already exist
      const user = await getUserByEmail(value);

      if (user) {
        return Promise.reject("Email already exists.");
      }
    }),
  body("password").isString().bail().isLength({ min: 6 }),
  body("first_name").isString().bail().isLength({ min: 3 }),
  body("last_name").isString().bail().isLength({ min: 3 }),
];
