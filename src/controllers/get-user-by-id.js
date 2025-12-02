import { ok, serverError } from "./helpers/http.js";
import { checkIfIdIsValid, invalidIdResponse } from "./helpers/validation.js";

export class GetUserByIdController {

  constructor(getUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase
  }

  async execute(httpRequest) {
    try {
      const isIdValid = checkIfIdIsValid(httpRequest.params.userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const user = await this.getUserByIdUseCase.execute(httpRequest.params.userId);

      if (!user) {
        return {
          statusCode: 404,
          body: {
            message: "User not found",
          },
        };
      }

      return ok(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
