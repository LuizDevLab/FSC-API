import "dotenv/config.js";
import express from "express";
import { CreateUserController } from "./src/controllers/create-user.js";
import { CreateUserUseCase } from "./src/use-cases/create-user.js";
import { PostgresGetUserByEmailRepository } from "./src/repositories/postgres/get-user-by-email.js";
import { GetUserByIdController } from "./src/controllers/get-user-by-id.js";
import { UpdateUserController } from "./src/controllers/update-user.js";
import { DeleteUserController } from "./src/controllers/delete-user.js";
import { GetUserByIdUseCase } from "./src/use-cases/get-user-by-id.js";
import { PostgresGetUserById } from "./src/repositories/postgres/get-user-by-id.js";
import { PostgresCreateUserRepository } from "./src/repositories/postgres/create-user.js";
import { PostgresUpdateUserRepository } from "./src/repositories/postgres/upate-user.js";
import { UpdateUserCase } from "./src/use-cases/update-user.js";

const app = express();

app.use(express.json());

app.post("/api/users", async (request, response) => {
  const createUserRepository = new PostgresCreateUserRepository();
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository
  );
  const createdUserController = new CreateUserController(createUserUseCase);

  const { statusCode, body } = await createdUserController.execute(request);

  response.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (request, response) => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
  const updateUserReporitory = new PostgresUpdateUserRepository()

  const updateUserUseCase = new UpdateUserCase(getUserByEmailRepository, updateUserReporitory)

  const updateUserController = new UpdateUserController(updateUserUseCase);

  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

app.get("/api/users/:userId", async (request, response) => {
  const getUserByIdRepository = new PostgresGetUserById();

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const { statusCode, body } = await getUserByIdController.execute(request);

  response.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (request, response) => {
  const deleteUserController = new DeleteUserController();

  const { statusCode, body } = await deleteUserController.execute(request);

  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
