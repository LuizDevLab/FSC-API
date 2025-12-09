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

    // const query = `
    //   INSERT INTO transactions (id, user_id, name, date, amount, type)
    //   VALUES ($1, $2, $3, $4, $5, $6)
    //   RETURNING *;
    // `;

    // const values = [
    //   createTransactionsParams.id,
    //   createTransactionsParams.user_id,
    //   createTransactionsParams.name,
    //   createTransactionsParams.date,
    //   createTransactionsParams.amount,
    //   createTransactionsParams.type,
    // ];

    // const results = await PostgresHelper.query(query, values);

    // return results[0];
  }
}
