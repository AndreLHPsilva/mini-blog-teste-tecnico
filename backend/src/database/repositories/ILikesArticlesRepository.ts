import { ILikesArticles } from "@models/LikesArticles";

export interface ICreateLikesArticlesDTO {
  user_id: string;
  article_id: string;
}

export interface IFindByParamsLikesArticlesDTO {
  user_id: string;
  article_id: string;
}

export interface ILikesArticlesRepository {
  create(data: ICreateLikesArticlesDTO): Promise<ILikesArticles>;
  dislike(likes_articles_id: string): Promise<void>;
  getByArticleId(article_id: string): Promise<ILikesArticles[]>;
  findById(likes_articles_id: string): Promise<ILikesArticles>;
  findByParams(
    data: IFindByParamsLikesArticlesDTO
  ): Promise<ILikesArticles | null>;
}
