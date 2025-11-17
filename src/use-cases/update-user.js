import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";
import { PostgresUpdateUserRepository } from "../repositories/postgres/upate-user.js";

export class UpdateUserCase {

  constructor(getUserByEmailRepository, updateUserRepository) {
    this.getUserByEmailRepository = getUserByEmailRepository
    this.updateUserRepository = updateUserRepository
  } 

  async execute(userId, updateUserParams) {
    //1. se o email estiver sendo atualizado, verificar se ele ja esta em uso

    const userWithProvidedEmail = await this.getUserByEmailRepository.execute(
      updateUserParams.email
    );

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError(updateUserParams.email);
    }

    const user = {
      ...updateUserParams,
    };

    //2. se a senha estiver sendo atualizada, criptografa-la
    if (updateUserParams.password) {
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10);
      user.password = hashedPassword;
    }

    //3. chamar o repository para atualizar o usuario

    const updatedUser = await this.updateUserRepository.execute(
      userId,
      user
    );

    return updatedUser;
  }
}
