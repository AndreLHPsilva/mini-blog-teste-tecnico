import { IArticlesRepository } from "@database/repositories/IArticlesRepository";
import { ICommentsRepository } from "@database/repositories/ICommentsRepository";
import { ILikesArticlesRepository } from "@database/repositories/ILikesArticlesRepository";
import { ILikesCommentsRepository } from "@database/repositories/ILikesCommentsRepository";
import { ApiError } from "@errors/ApiError";

import { inject, injectable } from "tsyringe";

interface ILikeCommentDTO {
  articleId: string;
  commentId: string;
  user_id: string;
}

@injectable()
class LikeUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository,
    @inject("LikesCommentsRepository")
    private likesCommentsRepository: ILikesCommentsRepository,
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository
  ) {}

  async execute({
    articleId,
    commentId,
    user_id,
  }: ILikeCommentDTO): Promise<void> {
    const article = await this.articlesRepository.find(articleId);

    if (!article) {
      throw new ApiError("Artigo não encontrado.");
    }

    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new ApiError("Comentário não encontrado.");
    }

    const likeComment = await this.likesCommentsRepository.findByParams({
      article_id: articleId,
      comment_id: commentId,
      user_id,
    });

    if (likeComment) {
      throw new ApiError("Você já curtiu este comentário");
    }

    await this.likesCommentsRepository.create({
      article_id: articleId,
      comment_id: commentId,
      user_id,
    });

    return;
  }
}

export { LikeUseCase };
