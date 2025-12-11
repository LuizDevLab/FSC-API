import { prisma } from "../../../../prisma/prisma.js";
import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresUpdateTransactionRepository {
  
  async execute(transactionId, updateTransactionParams) {
    
    return await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: updateTransactionParams
    })

  }
}
