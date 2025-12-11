import { prisma } from "../../../../prisma/prisma.js";
import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresCreateTransactionRepository {
  async execute(createTransactionsParams) {
    return await prisma.transaction.create({
      data: {
        id: createTransactionsParams.id,
        user_id: createTransactionsParams.user_id,
        name: createTransactionsParams.name,
        date: createTransactionsParams.date,
        amount: createTransactionsParams.amount,
        type: createTransactionsParams.type,
      },
    });

   
  }
}
