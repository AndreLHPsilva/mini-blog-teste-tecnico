import { IArticlesRepository } from "@database/repositories/IArticlesRepository";
import { ICommentsRepository } from "@database/repositories/ICommentsRepository";
import { ILikesArticlesRepository } from "@database/repositories/ILikesArticlesRepository";
import { IArticles } from "@models/Articles";
import { IComments } from "@models/Comments";
import { ILikesArticles } from "@models/LikesArticles";
import { inject, injectable } from "tsyringe";

interface IGetDTO {
  start: number;
  end: number;
}

interface IResponseDTO {
  articles: IArticles[];
}

@injectable()
class GetUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository,
    @inject("LikesArticlesRepository")
    private likesArticlesRepository: ILikesArticlesRepository,
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository
  ) {}

  async execute({ end, start }: IGetDTO): Promise<IResponseDTO> {
    const articles = await this.articlesRepository.get({ end, start });

    const articles_ids: string[] = articles.map(
      (article: IArticles) => article.id
    );

    const commentsByArticleId: Map<string, IComments[]> = new Map<
      string,
      IComments[]
    >();

    const likesByArticleId: Map<string, ILikesArticles[]> = new Map<
      string,
      ILikesArticles[]
    >();

    await Promise.all(
      articles_ids.map(async (id) => {
        // INIT COMMENTS BY ARTICLE
        const comments = await this.commentsRepository.getByArticleId(id);

        if (!commentsByArticleId.has(id)) {
          commentsByArticleId.set(id, []);
        }

        commentsByArticleId.get(id)?.push(...comments);

        // INIT LIKES BY ARTICLE
        const likes = await this.likesArticlesRepository.getByArticleId(id);

        if (!likesByArticleId.has(id)) {
          likesByArticleId.set(id, []);
        }

        likesByArticleId.get(id)?.push(...likes);
      })
    );

    articles.forEach((article: IArticles) => {
      let comments: IComments[] = [];
      if (commentsByArticleId.has(article.id)) {
        const dataComments = commentsByArticleId.get(article.id)!;
        comments.push(...dataComments);
      }

      let likes: ILikesArticles[] = [];
      if (likesByArticleId.has(article.id)) {
        const dataLikes = likesByArticleId.get(article.id)!;
        likes.push(...dataLikes);
      }

      const total_comments = comments?.length > 0 ? comments?.length : 0;
      const total_likes = likes?.length > 0 ? likes?.length : 0;

      article.comments_total = total_comments;
      article.likes_total = total_likes;
    });

    return { articles };
  }
}

export { GetUseCase };
