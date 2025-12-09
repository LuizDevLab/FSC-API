import { prisma } from "../../../prisma/prisma.js";
import { PostgresHelper } from "../../db/postgres/helper.js";

export class PostgresDeleteUserRepository {
  async execute(userId) {
    return await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
