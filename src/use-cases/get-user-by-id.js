import { PostgresGetUserById } from "../repositories/postgres/get-user-by-id.js";

export class GetUserByIdUseCase {

  constructor(getUserByIdRepository) {
    this.getUserByIdRepository = new PostgresGetUserById()
  }

  async execute(userId) {
    const user = await this.getUserByIdRepository.execute(userId)

    return user;
  }
}