import { CreateUserController } from "./create-user";

describe("Create User Controller", () => {
  class CreateUserUseCaseStub {
    execute(user) {
      return user
    }
  }

 
  it("should return 201 when creating a user", async () => {
    //arrange
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserController = new CreateUserController(createUserUseCase);

    const httpRequest = {
      body: {
        first_name: "Luiz",
        last_name: "Henrique",
        email: "lu@email.com",
        password: "1234567",
      },
    };
    //act

    const result = await createUserController.execute(httpRequest)
    
    //assert
    expect(result.statusCode).toBe(201)
    expect(result.body).not.toBeUndefined()
    expect(result.body).not.toBeNull()
  });
});
