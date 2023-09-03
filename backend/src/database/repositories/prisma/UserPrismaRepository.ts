import { IUsers } from "@models/Users";
import { prisma } from ".";
import { ICreateUserDTO, IUserRepository } from "../IUserRepository";

class UserPrismaRepository implements IUserRepository {
  constructor(private repository = prisma.user) {}

  async findByEmail(email: string): Promise<IUsers | null> {
    return await this.repository.findUnique({
      where: { email },
      include: { comments: true, likes: true, LikesComments: true },
    });
  }
  async findById(user_id: string): Promise<IUsers | null> {
    return await this.repository.findUnique({
      where: { id: user_id },
      include: { comments: true, likes: true, LikesComments: true },
    });
  }

  async create(data: ICreateUserDTO): Promise<IUsers> {
    return await this.repository.create({ data });
  }
}

export { UserPrismaRepository };
