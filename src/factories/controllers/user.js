import { CreateUserController } from "../../controllers/create-user.js";
import { DeleteUserController } from "../../controllers/delete-user.js";
import { GetUserBalanceController } from "../../controllers/get-user-balance.js";
import { GetUserByIdController } from "../../controllers/get-user-by-id.js";
import { UpdateUserController } from "../../controllers/update-user.js";
import { PostgresCreateUserRepository } from "../../repositories/postgres/create-user.js";
import { PostgresDeleteUserRepository } from "../../repositories/postgres/delete-user.js";
import { PostgresGetUserBalanceRepository } from "../../repositories/postgres/get-user-balance.js";
import { PostgresGetUserByEmailRepository } from "../../repositories/postgres/get-user-by-email.js";
import { PostgresGetUserById } from "../../repositories/postgres/get-user-by-id.js";
import { PostgresUpdateUserRepository } from "../../repositories/postgres/upate-user.js";
import { CreateUserUseCase } from "../../use-cases/create-user.js";
import { DeleteUserUseCase } from "../../use-cases/delete-user.js";
import { GetUserBalanceUseCase } from "../../use-cases/get-user-balance.js";
import { GetUserByIdUseCase } from "../../use-cases/get-user-by-id.js";
import { UpdateUserCase } from "../../use-cases/update-user.js";

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new PostgresGetUserById();

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  return getUserByIdController;
};

export const makeCreateUserController = () => {
  const createUserRepository = new PostgresCreateUserRepository();
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository
  );

  const createdUserController = new CreateUserController(createUserUseCase);

  return createdUserController;
};

export const makeUpdateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const updateUserReporitory = new PostgresUpdateUserRepository();

  const updateUserUseCase = new UpdateUserCase(
    getUserByEmailRepository,
    updateUserReporitory
  );

  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};

export const makeDeleteUserController = () => {
  const deleteUserRepository = new PostgresDeleteUserRepository();

  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController;
};

export const makeGetUserBalanceController = () => {
  const getUserByIdRepository = new PostgresGetUserById();
  const getUserBalanceRepository = new PostgresGetUserBalanceRepository();

  const getUserBalanceUseCase = new GetUserBalanceUseCase(
    getUserBalanceRepository,
    getUserByIdRepository
  );

  const getUserBalanceController = new GetUserBalanceController(
    getUserBalanceUseCase
  );

  return getUserBalanceController;
};
