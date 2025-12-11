import { prisma } from "../../../../prisma/prisma.js";
import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresDeleteTransactionRepository {
  async execute(transactionId) {
    try {
      return await prisma.transaction.delete({
        where: {
          id: transactionId,
        },
      });
    } catch (error) {
      return "Transaction not found";
    }
  }
}
