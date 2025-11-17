import { PostgresDeleteUserRepository } from "../repositories/postgres/delete-user.js";

export class DeleteUserUseCase {
  constructor(deleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  async execute(userId) {
    const deletedUser = await this.deleteUserRepository.execute(userId);

    return deletedUser;
  }
}
