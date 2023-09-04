import { IArticles } from "@models/Articles";

export interface IGetArticlesDTO {
  start: number;
  end: number;
}

export interface IArticlesRepository {
  find(article_id: string): Promise<IArticles | null>;
  get(data?: IGetArticlesDTO): Promise<IArticles[]>;
}
