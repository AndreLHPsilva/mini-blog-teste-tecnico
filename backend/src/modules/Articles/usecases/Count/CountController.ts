import { Request, Response } from "express";
import { container } from "tsyringe";
import { CountUseCase } from "./CountUseCase";

class CountController {
  async handle(req: Request, res: Response) {
    const countUseCase = container.resolve(CountUseCase);
    const response = await countUseCase.execute();

    return res.returnApi({
      data: response,
      message: "Quantidade de artigos",
      statusHTTP: 200,
      developerMessage: "Articles quantity",
    });
  }
}

export { CountController };
