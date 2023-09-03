import { IUserRepository } from "@database/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RecoverDataUseCase {

  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ){}

  async execute(user_id: string) {
    return await this.userRepository.findById(user_id);
  }
}

export { RecoverDataUseCase };
