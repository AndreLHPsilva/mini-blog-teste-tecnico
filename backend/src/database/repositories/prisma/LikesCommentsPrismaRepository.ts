import { IUsers } from "@models/Users";
import { prisma } from ".";
import { ICreateUserDTO, IUserRepository } from "../IUserRepository";
import {
  ICreateLikesCommentsDTO,
  IFindLikeCommentByParamsDTO,
  ILikesCommentsRepository,
} from "../ILikesCommentsRepository";
import { ILikesComments } from "@models/LikesComments";

class LikesCommentsPrismaRepository implements ILikesCommentsRepository {
  constructor(private repository = prisma.likesComments) {}

  async findById(like_comment_id: string): Promise<ILikesComments | null> {
    const likeComment = await this.repository.findFirst({
      where: { id: like_comment_id },
    });

    return likeComment;
  }
  async findByCommentId(comment_id: string): Promise<ILikesComments | null> {
    const likeComment = await this.repository.findFirst({
      where: {
        comment_id,
      },
    });

    return likeComment;
  }

  async destroy(like_comment_id: string): Promise<void> {
    await this.repository.delete({
      where: {
        id: like_comment_id,
      },
    });

    return;
  }
  async create(data: ICreateLikesCommentsDTO): Promise<ILikesComments> {
    const likeComment = await this.repository.create({
      data,
    });

    return likeComment;
  }

  async findByParams({
    article_id,
    user_id,
    comment_id,
  }: IFindLikeCommentByParamsDTO): Promise<ILikesComments | null> {
    const like = await this.repository.findFirst({
      where: {
        article_id,
        user_id,
        comment_id,
      },
      include: {
        user: true,
      },
    });

    return like;
  }
}

export { LikesCommentsPrismaRepository };
