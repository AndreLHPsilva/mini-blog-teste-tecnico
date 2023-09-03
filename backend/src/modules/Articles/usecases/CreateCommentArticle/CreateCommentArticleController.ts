import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCommentArticleUseCase } from "./CreateCommentArticleUseCase";
import { CreateCommentArticleValidation } from "./CreateCommentArticleValidation";

class CreateCommentArticleController {
  async handle(req: Request, res: Response) {
    const { articleId } = req.params;
    const { content } = CreateCommentArticleValidation.validate(req.body);

    const user_id = req.auth_user!.id;

    const createCommentArticleUseCase = container.resolve(
      CreateCommentArticleUseCase
    );

    const comment = await createCommentArticleUseCase.execute({
      article_id: articleId,
      content,
      user_id,
    });

    return res.returnApi({
      data: comment,
      message: "Comentário criado com sucesso.",
      statusHTTP: 201,
      developerMessage: "Comment created",
    });
  }
}

export { CreateCommentArticleController };
