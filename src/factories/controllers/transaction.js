import { CreateTransactionController } from "../../controllers/transactions/create-transaction.js";
import { PostgresGetUserById } from "../../repositories/postgres/get-user-by-id.js";
import { PostgresCreateTransactionRepository } from "../../repositories/postgres/transactions/create-transaction.js";
import { CreateTransactionUseCase } from "../../use-cases/transactions/create-transaction.js";

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new PostgresCreateTransactionRepository();

  const getUserByIdRepository = new PostgresGetUserById();

  const createTransactionUseCase = new CreateTransactionUseCase(
    createTransactionRepository,
    getUserByIdRepository
  );

  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase
  );

  return createTransactionController;
};
