import { CreateUserUseCase } from "../use-cases/create-user.js";
import validator from "validator";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { badRequest, created, serverError } from "./helpers/http.js";
import { checkIfEmailIsValid, checkIfPasswordIsValid, emailAlreadyInUseResponse, invalidPasswordResponse } from "./helpers/user.js";

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      // validar a requisição (campos obrigatórios, tamanho de senha e email válido)
      const requireFields = ["first_name", "last_name", "email", "password"];

      for (const field of requireFields || params[field].trim().length == 0) {
        if (!params[field]) {
          return badRequest({ message: `Missing params: ${field}` });
        }
      }

      const passwordIsValid = checkIfPasswordIsValid()

      //tamanho de senha
      if (!passwordIsValid) {
        return invalidPasswordResponse();
      }

      //validação do email
      const emailIsValid = checkIfEmailIsValid();

      if (!emailIsValid) {
        return emailAlreadyInUseResponse();
      }

      //chamar o usecase
      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      return created(createdUser);
      //retornar status HTTP
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }

      console.log(error);
      return serverError();
    }
  }
}
