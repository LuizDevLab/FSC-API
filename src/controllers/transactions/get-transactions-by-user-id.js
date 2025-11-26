import { UserNotFoundError } from "../../errors/user.js";
import { ok } from "../helpers/http.js";
import { userNotFoundResponse } from "../helpers/user.js";
import {
  checkIfIdIsValid,
  invalidIdResponse,
  requiredFieldIsMissingResponse,
} from "../helpers/validation.js";

export class PostgresGetTransactionsByUserIdController {
  constructor(getTransactionByUserIdUseCase) {
    this.getTransactionByUserIdUseCase = getTransactionByUserIdUseCase;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId;
      //verficar se o userId foi passado como parâmetro
      if (!userId) {
        return requiredFieldIsMissingResponse("userId");
      }
      //verificar se o userId é um id válido
      const userIdIsValid = checkIfIdIsValid(userId);

      if (!userIdIsValid) {
        return invalidIdResponse();
      }
      //chamar useCase
      const transactions = await this.getTransactionByUserIdUseCase.execute({
        userId,
      });
      //retornar resposta HTTP

      return ok(transactions)
    } catch (error) {
      console.error(error);

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      return serverEr;
    }
  }
}
