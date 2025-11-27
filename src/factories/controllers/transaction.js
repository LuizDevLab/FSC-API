import { CreateTransactionController } from "../../controllers/transactions/create-transaction.js";
import { GetTransactionsByUserIdController } from "../../controllers/transactions/get-transactions-by-user-id.js";
import { PostgresGetUserById } from "../../repositories/postgres/get-user-by-id.js";
import { PostgresCreateTransactionRepository } from "../../repositories/postgres/transactions/create-transaction.js";
import { PostgresGetTransactionsByUserIdRepository } from "../../repositories/postgres/transactions/get-transactions-by-user-id.js";
import { CreateTransactionUseCase } from "../../use-cases/transactions/create-transaction.js";
import { GetTransactionsByUserIdUseCase } from "../../use-cases/transactions/get-transactions-by-user-id.js";

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
// tempo 18:30
export const makeGetTransactionsByUserIdController  = () => {
  const geetTransactionsByUserIdRepository =
    new PostgresGetTransactionsByUserIdRepository();

  const getUserByIdRepository = new PostgresGetUserById();

  const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
    geetTransactionsByUserIdRepository,
    getUserByIdRepository
  );

  const geetTransactionsByUserIdcontroller =
    new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);

  return geetTransactionsByUserIdcontroller;
};
