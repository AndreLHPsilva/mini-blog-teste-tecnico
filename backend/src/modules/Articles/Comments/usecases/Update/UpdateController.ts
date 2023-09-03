import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUseCase } from "./UpdateUseCase";
import { UpdateValidation } from "./UpdateValidation";


class UpdateController {
  async handle(req: Request, res: Response) {
    const { commentId } = req.params;
    const { content } = UpdateValidation.validate(req.body);

    const updateUseCase = container.resolve(UpdateUseCase);
    const newData = await updateUseCase.execute({ commentId, content });

    return res.returnApi({
      data: newData,
      message: "Comentário atualizado",
      statusHTTP: 200,
      developerMessage: "Updated comment",
    });
  }
}

export { UpdateController };
