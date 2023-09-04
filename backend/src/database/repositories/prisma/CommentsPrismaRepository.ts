import { prisma } from ".";
import {
  ICommentsRepository,
  ICreateCommentDTO,
  IUpdateCommentDTO,
} from "../ICommentsRepository";
import { IComments } from "@models/Comments";

class CommentsPrismaRepository implements ICommentsRepository {
  constructor(private repository = prisma.comment) {}

  async update({ comment_id, content }: IUpdateCommentDTO): Promise<IComments> {
    const commentUpdated = await this.repository.update({
      where: { id: comment_id },
      data: { content },
      include: {
        LikesComments: true,
        user: true,
      },
    });

    return commentUpdated;
  }

  async destroy(comment_id: string): Promise<void> {
    await this.repository.delete({ where: { id: comment_id } });

    return;
  }

  async create(data: ICreateCommentDTO): Promise<IComments> {
    const comment = await this.repository.create({
      data,
      include: {
        LikesComments: true,
        user: true,
      },
    });

    return comment;
  }
  async getByArticleId(article_id: string): Promise<IComments[]> {
    const comments = await this.repository.findMany({
      where: { article_id },
      include: { user: true, LikesComments: true },
    });

    return comments;
  }

  async findById(comment_id: string): Promise<IComments | null> {
    const comments = await this.repository.findUnique({
      where: {
        id: comment_id,
      },
    });

    return comments;
  }
}

export { CommentsPrismaRepository };
