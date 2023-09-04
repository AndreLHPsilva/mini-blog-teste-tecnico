import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUseCase } from "./GetUseCase";

class GetController {
  async handle(req: Request, res: Response) {
    const { start = 0, end = 10 } = req.query;

    const getUseCase = container.resolve(GetUseCase);
    const response = await getUseCase.execute({
      start: Number(start),
      end: Number(end),
    });

    return res.returnApi({
      data: response,
      message: "Lista de artigos",
      statusHTTP: 200,
      developerMessage: "Articles lists",
    });
  }
}

export { GetController };
