import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";
import { PostgresUpdateUserRepository } from "../repositories/postgres/upate-user.js";

export class UpdateUserCase {
  constructor(getUserByEmailRepository, updateUserRepository) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.updateUserRepository = updateUserRepository;
  }

  async execute(userId, updateUserParams) {
    // 1. se email está sendo atualizado...
    if (updateUserParams.email) {
      const userWithProvidedEmail = await this.getUserByEmailRepository.execute(
        updateUserParams.email
      );

      // ... verificar se já está em uso
      if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
        throw new EmailAlreadyInUseError(updateUserParams.email);
      }
    }

    const user = { ...updateUserParams };

    // 2. Criptografar senha se estiver sendo atualizada
    if (updateUserParams.password) {
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10);
      user.password = hashedPassword;
    }

    // 3. Atualizar o usuário
    const updatedUser = await this.updateUserRepository.execute(userId, user);

    return updatedUser;
  }
}
