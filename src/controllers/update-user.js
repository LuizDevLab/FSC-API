import validator from "validator";
import { badRequest, ok, serverError } from "./helpers/http.js";
import { UpdateUserCase } from "../use-cases/update-user.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailAlreadyInUseResponse,
  invalidPasswordResponse,
} from "./helpers/user.js";
import { checkIfIdIsValid, invalidIdResponse } from "./helpers/validation.js";
import { updateUserSchema } from "../schemas/schemas-user.js";

import { ZodError } from "zod";

export class UpdateUserController {
  constructor(updateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.params.userId;

      const isIdValid = checkIfIdIsValid(params);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const updateUserParams = httpRequest.body;

      await updateUserSchema.parseAsync(updateUserParams);

      const updatedUser = await this.updateUserUseCase.execute(
        params,
        updateUserParams
      );

      return ok(updatedUser);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({
          message: error.issues[0].message,
        });
      }

      console.log(error);
      return serverError();
    }
  }
}
