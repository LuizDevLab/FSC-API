import { PostgresHelper } from "../../../db/postgres/helper.js";
import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetTransactionsByUserIdRepository {
  async execute(userId) {
    return await prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
    });
  }
}
