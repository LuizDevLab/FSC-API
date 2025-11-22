import validator from "validator";
import { badRequest } from "./http.js";

export const invalidPasswordResponse = () => {
  return badRequest({
    message: "Password must be at least 6 characters",
  });
};

export const emailAlreadyInUseResponse = () => {
  return badRequest({
    message: "Invalid e-mail. Please use a valid one.",
  });
};



export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

