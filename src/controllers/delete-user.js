import { DeleteUserUseCase } from "../use-cases/delete-user"
import { ok, serverError } from "./helpers/http.js"
import { checkIfIdIsValid, invalidIdResponse } from "./helpers/user.js"

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId =  httpRequest.params.userId
      const idIsValid = checkIfIdIsValid(userId)

      if (!idIsValid) {
        return invalidIdResponse()
      }

      const deleteUserUseCase = new DeleteUserUseCase()

      const deletedUser = await deleteUserUseCase.execute(userId)

      return ok(deletedUser)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}