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

interface IDislikeArticleDTO {
  article_id: string;
  user_id: string;
}

@injectable()
class DislikeArticleUseCase {
  constructor(
    @inject("LikesArticlesRepository")
    private likesArticlesRepository: ILikesArticlesRepository,
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
  ) {}

  async execute({ article_id, user_id }: IDislikeArticleDTO): Promise<void> {
    const article = await this.articlesRepository.find(article_id);

    if(!article){
      throw new ApiError("Artigo não encontrado");
    }

    const like = await this.likesArticlesRepository.findByParams({
      article_id,
      user_id,
    });

    if (!like) {
      throw new ApiError("Curtida não encontrada.");
    }

    await this.likesArticlesRepository.dislike(like.id);
  }
}

export { DislikeArticleUseCase };
