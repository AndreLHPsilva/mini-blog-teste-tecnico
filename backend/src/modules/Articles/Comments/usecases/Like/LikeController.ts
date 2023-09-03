import { Request, Response } from "express";
import { container } from "tsyringe";
import { LikeUseCase } from "./LikeUseCase";

class LikeController {
  async handle(req: Request, res: Response) {
    const { commentId, articleId } = req.params;

    const user_id = req.auth_user.id;

    const likeUseCase = container.resolve(LikeUseCase);
    await likeUseCase.execute({ commentId, articleId, user_id });

    return res.returnApi({
      data: null,
      message: "Comentário curtido com sucesso",
      statusHTTP: 201,
      developerMessage: "Comment liked",
    });
  }
}

export { LikeController };
