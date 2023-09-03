import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUseCase } from "./FindUseCase";

class FindController {
  async handle(req: Request, res: Response) {
    const { articleId } = req.params;

    const findUseCase = container.resolve(FindUseCase);
    const article = await findUseCase.execute(articleId);

    return res.returnApi({
      data: article,
      message: "Artigo buscado",
      statusHTTP: 200,
      developerMessage: "Article searched",
    });
  }
}

export { FindController };
