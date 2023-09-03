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
  comment_id: string;
}

@injectable()
class RemoveCommentArticleUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository
  ) {}

  async execute({ comment_id }: ILikeArticleDTO): Promise<void> {

    const comment = await this.commentsRepository.findById(comment_id);

    if(!comment){
      throw new ApiError("Comentário não encontrado.");
    }

    await this.commentsRepository.destroy(comment_id)
    
  }
}

export { RemoveCommentArticleUseCase };
