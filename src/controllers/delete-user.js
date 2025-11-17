import { DeleteUserUseCase } from "../use-cases/delete-user.js"
import { ok, serverError } from "./helpers/http.js"
import { checkIfIdIsValid, invalidIdResponse } from "./helpers/user.js"

export class DeleteUserController {

  constructor(deleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase
  }

  async execute(httpRequest) {
    try {
      const userId =  httpRequest.params.userId
      const idIsValid = checkIfIdIsValid(userId)

      if (!idIsValid) {
        return invalidIdResponse()
      }

      const deletedUser = await this.deleteUserUseCase.execute(userId)

      if (!deletedUser) {
        return {
          statusCode: 404,
          body: {
            message: "User not found",
          },
        };
      }

      return ok(deletedUser)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}