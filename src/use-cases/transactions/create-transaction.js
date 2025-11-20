import { UserNotFoundError } from "../../errors/user.js";
import { v4 as uuidv4 } from "uuid";

export class CreateTransactionUseCase {
  constructor(createTransactionRepository, getUserByIdRepository) {
    this.createTransactionrepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(createTransactionParams) {
    // validar se user existe
    const userId = createTransactionParams.userId;

    const user = this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const transactionId = uuidv4();

    const transaction = await thiss.createTransactionRepository.execute({
      ...createTransactionParams,
      id: transactionId
    });

    return transaction
  }
}
