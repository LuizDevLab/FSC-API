import validator from "validator";
import { badRequest, ok, serverError } from "./helpers/http.js";
import { UpdateUserCase } from "../use-cases/update-user.js";
import { checkIfEmailIsValid, checkIfPasswordIsValid, emailAlreadyInUseResponse, invalidIdResponse, invalidPasswordResponse } from "./helpers/user.js";

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;

      const isIdValid = validator.isUUID(userId);

      if (!isIdValid) {
       return invalidIdResponse()
      }

      const updateUserParams = httpRequest.body;

      const allowedFields = ["first_name", "last_name", "email", "password"];

      const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
        (field) => !allowedFields.includes(field)
      );

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: "Some provided field is not allowed",
        });
      }

      //senha
      if (updateUserParams.password) {
        const passwordIsValid = checkIfPasswordIsValid(updateUserParams.password)

        if (!passwordIsValid) {
          return invalidPasswordResponse()
        }
      }

      if (updateUserParams.email) {
        const emailIsValid = checkIfEmailIsValid(updateUserParams.email);

        if (!emailIsValid) {
          return emailAlreadyInUseResponse()
        }
      }

      const updateUserUseCase = new UpdateUserCase();

      const updatedUser = await updateUserUseCase.execute(userId, updateUserParams);

      return ok(updatedUser)
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
