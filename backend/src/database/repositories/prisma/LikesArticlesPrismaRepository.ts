import { prisma } from ".";

import { ILikesArticles } from "@models/LikesArticles";
import {
  ICreateLikesArticlesDTO,
  IFindByParamsLikesArticlesDTO,
  ILikesArticlesRepository,
} from "../ILikesArticlesRepository";

class LikesArticlesPrismaRepository implements ILikesArticlesRepository {
  constructor(private repository = prisma.likeArticle) {}

  async dislike(likes_articles_id: string): Promise<void> {
    await this.repository.delete({ where: { id: likes_articles_id } });

    return;
  }

  async findByParams({
    article_id,
    user_id,
  }: IFindByParamsLikesArticlesDTO): Promise<ILikesArticles | null> {
    const like = await this.repository.findFirst({
      where: {
        article_id,
        user_id,
      },
      include: {
        user: true,
      },
    });

    return like;
  }

  async create(data: ICreateLikesArticlesDTO): Promise<ILikesArticles> {
    const like = await this.repository.create({ data });

    return like as ILikesArticles;
  }
  async getByArticleId(article_id: string): Promise<ILikesArticles[]> {
    const likes = await this.repository.findMany({ where: { article_id } });

    return likes as ILikesArticles[];
  }
  findById(likes_articles_id: string): Promise<ILikesArticles> {
    throw new Error("Method not implemented.");
  }
}

export { LikesArticlesPrismaRepository };
