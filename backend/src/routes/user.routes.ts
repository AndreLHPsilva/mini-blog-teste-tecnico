import { AuthMiddleware } from "@middlewares/AuthMiddleware";
import { CreateController } from "@modules/User/usecases/Create/CreateController";
import { RecoverDataController } from "@modules/User/usecases/RecoverData/RecoverDataController";
import { SigninController } from "@modules/User/usecases/SignIn/SigninController";
import express from "express";

export const userRoutes = express.Router();
const authMiddleware = new AuthMiddleware();

const createController = new CreateController();
const signinController = new SigninController();
const recoverDataController = new RecoverDataController();

userRoutes.post("/", async (req, res) => {
  return await createController.handle(req, res);
});

userRoutes.post("/signin", async (req, res) => {
  return await signinController.handle(req, res);
});

userRoutes.get("/recover-data", authMiddleware.auth, async (req, res) => {
  return await recoverDataController.handle(req, res);
});
