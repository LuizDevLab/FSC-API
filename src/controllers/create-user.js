import { EmailAlreadyInUseError } from "../errors/user.js";
import { badRequest, created, serverError } from "./helpers/http.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailAlreadyInUseResponse,
  invalidPasswordResponse,
} from "./helpers/user.js";
import { requiredFieldIsMissingResponse, validateRequiredFields } from "./helpers/validation.js";

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      const requiredFields = ["first_name", "last_name", "email", "password"];
      // Validação de campos obrigatórios
      const { ok: requiredFieldsWereProvided, missingFields } = validateRequiredFields(
        params,
        requiredFields
      );

      if (!requiredFieldsWereProvided) {
        return requiredFieldIsMissingResponse(missingFields)
      }
      
      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing params: ${field}` });
        }
      }

      // Validação da senha
      const passwordIsValid = checkIfPasswordIsValid(params.password);
      if (!passwordIsValid) {
        return invalidPasswordResponse();
      }

      // Validação do email
      const emailIsValid = checkIfEmailIsValid(params.email);
      if (!emailIsValid) {
        return emailAlreadyInUseResponse();
      }

      // Chamar o use case
      const createdUser = await this.createUserUseCase.execute(params);

      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }

      console.error(error);
      return serverError();
    }
  }
}
