import { Request, Response } from "express";
import { container } from "tsyringe";
import { DislikeUseCase } from "./DislikeUseCase";

class DislikeController {
  async handle(req: Request, res: Response) {
    const { commentId } = req.params;

    const dislikeUseCase = container.resolve(DislikeUseCase);
    await dislikeUseCase.execute(commentId);

    return res.returnApi({
      data: null,
      message: "Curtida removida",
      statusHTTP: 200,
      developerMessage: "Disliked Article",
    });
  }
}

export { DislikeController };
