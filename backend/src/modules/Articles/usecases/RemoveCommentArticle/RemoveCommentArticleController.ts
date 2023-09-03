import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveCommentArticleUseCase } from "./RemoveCommentArticleUseCase";
import { ApiError } from "@errors/ApiError";

class RemoveCommentArticleController {
  async handle(req: Request, res: Response) {
    const { commentId } = req.params;

    const removeCommentArticleUseCase = container.resolve(
      RemoveCommentArticleUseCase
    );
    await removeCommentArticleUseCase.execute({
      comment_id: commentId,
    });

    return res.returnApi({
      data: null,
      message: "Comentário removido.",
      statusHTTP: 200,
      developerMessage: "Comment deleted",
    });
  }
}

export { RemoveCommentArticleController };
