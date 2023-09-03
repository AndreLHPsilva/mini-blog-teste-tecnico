import { axiosInstance } from "@config/axios";
import { IArticlesRepository } from "@database/repositories/IArticlesRepository";
import { ICommentsRepository } from "@database/repositories/ICommentsRepository";
import { ILikesArticlesRepository } from "@database/repositories/ILikesArticlesRepository";
import { ApiError } from "@errors/ApiError";
import { IArticles } from "@models/Articles";
import { IComments } from "@models/Comments";
import { ILikesArticles } from "@models/LikesArticles";
import axios from "axios";
import { inject, injectable } from "tsyringe";

interface ILikeArticleDTO {
  article_id: string;
  content: string;
  user_id: string;
}

@injectable()
class CreateCommentArticleUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository,
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository
  ) {}

  async execute({
    article_id,
    user_id,
    content,
  }: ILikeArticleDTO): Promise<IComments> {
    const article = await this.articlesRepository.find(article_id);

    if (!article) {
      throw new ApiError("Artigo não encontrado");
    }

    const comment = await this.commentsRepository.create({ article_id, content, user_id });

    comment.user!.password = undefined

    return comment
  }
}

export { CreateCommentArticleUseCase };
