import { CreateTransactionController } from "../../controllers/transactions/create-transaction.js";
import { DeleteTransactionController } from "../../controllers/transactions/delete-transaction.js";
import { GetTransactionsByUserIdController } from "../../controllers/transactions/get-transactions-by-user-id.js";
import { UpdateTransactionController } from "../../controllers/transactions/update-transaction.js";
import { PostgresGetUserById } from "../../repositories/postgres/get-user-by-id.js";
import { PostgresCreateTransactionRepository } from "../../repositories/postgres/transactions/create-transaction.js";
import { PostgresDeleteTransactionRepository } from "../../repositories/postgres/transactions/delete-transaction.js";
import { PostgresGetTransactionsByUserIdRepository } from "../../repositories/postgres/transactions/get-transactions-by-user-id.js";
import { PostgresUpdateTransactionRepository } from "../../repositories/postgres/transactions/update-transaction.js";
import { CreateTransactionUseCase } from "../../use-cases/transactions/create-transaction.js";
import { DeleteTransactionUseCase } from "../../use-cases/transactions/delete-transaction.js";
import { GetTransactionsByUserIdUseCase } from "../../use-cases/transactions/get-transactions-by-user-id.js";
import { UpdateTransactionUseCase } from "../../use-cases/transactions/update-transaction.js";

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

export const makeGetTransactionsByUserIdController = () => {
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

export const makeUpdateTransactionController = () => {
  const updateTransactionRepository = new PostgresUpdateTransactionRepository();

  const updateTransactionUseCase = new UpdateTransactionUseCase(
    updateTransactionRepository
  );

  const updateTransactionController = new UpdateTransactionController(
    updateTransactionUseCase
  );

  return updateTransactionController;
};

export const makeDeleteTransactionController = () => {
  const deleteTransactionRepository = new PostgresDeleteTransactionRepository();

  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    deleteTransactionRepository
  );

  const deleteTransactionController = new DeleteTransactionController(
    deleteTransactionUseCase
  );

  return deleteTransactionController;
};
