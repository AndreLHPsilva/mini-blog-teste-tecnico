import { IArticlesRepository } from "@database/repositories/IArticlesRepository";
import { ICommentsRepository } from "@database/repositories/ICommentsRepository";
import { ILikesArticlesRepository } from "@database/repositories/ILikesArticlesRepository";
import { ApiError } from "@errors/ApiError";
import { IArticles } from "@models/Articles";
import { IComments } from "@models/Comments";
import { ILikesArticles } from "@models/LikesArticles";
import { inject, injectable } from "tsyringe";

@injectable()
class FindUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository,
    @inject("LikesArticlesRepository")
    private likesArticlesRepository: ILikesArticlesRepository,
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository
  ) {}

  async execute(article_id: string): Promise<IArticles> {
    const articles = await this.articlesRepository.find(article_id);

    if (!articles) {
      throw new ApiError("Artigo não encontrado");
    }

    const [comments, likes] = await Promise.all([
      this.commentsRepository.getByArticleId(article_id),
      this.likesArticlesRepository.getByArticleId(article_id),
    ]);

    if (comments.length > 0) {
      comments.forEach((comment) => {
        if (comment?.user) {
          comment!.user!.password = undefined;
        }

        if(comment.LikesComments){
          if(comment.LikesComments.length > 0){
            comment.likes_total = comment.LikesComments.length;
          }else{
            comment.likes_total = 0;
          }
        }
      });
    }

    articles.likes = likes;
    articles.comments = comments;

    articles.comments_total = comments.length > 0 ? comments.length : 0;
    articles.likes_total = likes.length > 0 ? likes.length : 0;

    return articles;
  }
}

export { FindUseCase };
