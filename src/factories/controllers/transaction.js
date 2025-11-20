import { CreateTransactionController } from "../../controllers/transactions/create-transaction";
import { PostgresGetUserById } from "../../repositories/postgres/get-user-by-id";
import { PostgresCreateTransactionRepository } from "../../repositories/postgres/transactions/create-transaction";
import { CreateTransactionUseCase } from "../../use-cases/transactions/create-transaction";

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
