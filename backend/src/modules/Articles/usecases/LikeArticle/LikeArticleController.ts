import { Request, Response } from "express";
import { container } from "tsyringe";
import { LikeArticleUseCase } from "./LikeArticleUseCase";

class LikeArticleController {
  async handle(req: Request, res: Response) {
    const { articleId } = req.params;

    const user_id = req.auth_user!.id;

    const likeArticleUseCase = container.resolve(LikeArticleUseCase);
    await likeArticleUseCase.execute({ article_id: articleId, user_id });

    return res.returnApi({
      data: null,
      message: "Artigo curtido com sucesso",
      statusHTTP: 201,
      developerMessage: "Articles liked",
    });
  }
}

export { LikeArticleController };
