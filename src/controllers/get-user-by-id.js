import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { badRequest, created, serverError } from "./helpers.js";

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const getUserByIdUseCase = new GetUserByIdUseCase();

      const user = await getUserByIdUseCase.execute(httpRequest.params.userId);

      if (!user) {
        return {
          statusCode: 404,
          body: {
            message: "User not found",
          },
        };
      }

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
