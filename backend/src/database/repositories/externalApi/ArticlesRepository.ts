import { IArticles } from "@models/Articles";
import { IArticlesRepository, IGetArticlesDTO } from "../IArticlesRepository";
import axios, { AxiosResponse } from "axios";

class ArticlesRepository implements IArticlesRepository {
  constructor(private base_url = process.env.NEWS_API_URL) {}

  async find(article_id: string): Promise<IArticles | null> {
    try {
      const article: AxiosResponse = await axios.get(
        `${this.base_url}/posts/${article_id}`
      );

      return article?.data;
    } catch (error) {
      return null;
    }
  }
  async get({ end, start }: IGetArticlesDTO): Promise<IArticles[]> {
    try {
      const articles: AxiosResponse = await axios.get(
        `${this.base_url}/posts?_start=${start}&_end=${end}`
      );

      return articles?.data;
    } catch (error) {
      return [];
    }
  }
}

export { ArticlesRepository };
