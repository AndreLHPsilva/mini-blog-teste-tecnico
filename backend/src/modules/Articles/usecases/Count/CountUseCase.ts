import { IArticlesRepository } from "@database/repositories/IArticlesRepository";
import { inject, injectable } from "tsyringe";

interface IResponse {
  number_articles: number;
}

@injectable()
class CountUseCase {
  constructor(
    @inject("ArticlesRepository")
    private articlesRepository: IArticlesRepository
  ) {}

  async execute(): Promise<IResponse> {

    const articles = await this.articlesRepository.get();

    const number_articles = articles.length > 0 ? articles.length : 0;


    return { number_articles };
  }
}

export { CountUseCase };
