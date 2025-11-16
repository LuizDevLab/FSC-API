import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";
import { EmailAlreadyInUseError } from "../errors/user.js";

export class CreateUserUseCase {

  constructor(createUserRepository, getUserByEmail) {
    this.createUserRepository = createUserRepository
    this.getUserByEmail = getUserByEmail
  }

  async execute(createUserParams) {
    //TODO: verificar se o emial ja esta em uso

    const userWithProvidedEmail = await this.getUserByEmail.execute(
      createUserParams.email
    );

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError();
    }

    //gerar ID do usuario
    const userId = uuidv4();

    //criptografar a senha
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    //inserir usuario no banco de dados
    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    // chamar o repositorio

    const createdUser = await this.createUserRepository.execute(user);

    return createdUser;
  }
}
