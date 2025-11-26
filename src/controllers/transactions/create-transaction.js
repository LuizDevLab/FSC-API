import validator from "validator";
import { badRequest, created, serverError } from "../helpers/http.js";
import {
  checkIfIdIsValid,
  invalidIdResponse,
  requiredFieldIsMissingResponse,
  validateRequiredFields,
} from "../helpers/validation.js";
import { checkIfAmountIsValid, checkIfTypeIsValid, invalidAmountResponse, invalidTypeResponse } from "../helpers/transaction.js";

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ["user_id", "name", "date", "amount", "type"];

      // Validação de campos obrigatórios
      const { ok: requiredFieldsWereProvided, missingFields } = validateRequiredFields(
        params,
        requiredFields
      );

      if (!requiredFieldsWereProvided) {
        return requiredFieldIsMissingResponse(missingFields)
      }

      const userIdIsValid = checkIfIdIsValid(params.user_id);

      if (!userIdIsValid) {
        return invalidIdResponse();
      }

      const amountIsValid = checkIfAmountIsValid(params.amount)

      if (!amountIsValid) {
        return invalidAmountResponse()
      }

      const type = params.type.trim().toUpperCase();

      const typeIsValid = checkIfTypeIsValid(type)

      if (!typeIsValid) {
        return invalidTypeResponse()
      }

      const transaction = await this.createTransactionUseCase.execute({
        ...params,
        type,
      });

      return created(transaction);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
