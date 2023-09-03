import { Request, Response } from "express";
import { container } from "tsyringe";
import { DislikeArticleUseCase } from "./DislikeArticleUseCase";

class DislikeArticleController {
  async handle(req: Request, res: Response) {
    const { articleId } = req.params;

    const user_id = req.auth_user!.id;

    const dislikeArticleUseCase = container.resolve(DislikeArticleUseCase);
    await dislikeArticleUseCase.execute({ article_id: articleId, user_id });

    return res.returnApi({
      data: null,
      message: "Curtida removida",
      statusHTTP: 200,
      developerMessage: "Disliked Article",
    });
  }
}

export { DislikeArticleController };
