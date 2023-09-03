import { Request, Response } from "express";
import { container } from "tsyringe";
import { RecoverDataUseCase } from "./RecoverDataUseCase";
import { IUsers } from "@models/Users";

class RecoverDataController {
  async handle(req: Request, res: Response) {
    const user_id = req.auth_user.id;

    const recoverDataUseCase = container.resolve(RecoverDataUseCase);
    const userData = await recoverDataUseCase.execute(user_id);

    const {password, ...user} = userData!

    const userReturn: Omit<IUsers, "password"> = user;

    return res.returnApi({
      data: userReturn,
      statusHTTP: 201,
      message: "Cadastro realizado com sucesso.",
      developerMessage: "User Created",
    });
  }
}

export { RecoverDataController };
