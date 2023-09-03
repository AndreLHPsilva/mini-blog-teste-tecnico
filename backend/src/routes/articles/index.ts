import { GetController } from "@modules/Articles/usecases/Get/GetController";
import express from "express";
import { commentRoutes } from "./comment.routes";
import { FindController } from "@modules/Articles/usecases/Find/FindController";
import { LikeArticleController } from "@modules/Articles/usecases/LikeArticle/LikeArticleController";
import { DislikeArticleController } from "@modules/Articles/usecases/DislikeArticle/DislikeArticleController";
import { AuthMiddleware } from "@middlewares/AuthMiddleware";

export const articlesRoutes = express.Router();
const authMiddleware = new AuthMiddleware();

const getController = new GetController();
const findController = new FindController();
const likeArticleController = new LikeArticleController();
const dislikeArticleController = new DislikeArticleController();

articlesRoutes.use(commentRoutes);

articlesRoutes.get(`/:articleId`, async (req, res) => {
  return await findController.handle(req, res);
});

articlesRoutes.get(`/`, async (req, res) => {
  return await getController.handle(req, res);
});

articlesRoutes.post(
  "/:articleId/like",
  authMiddleware.auth,
  async (req, res) => {
    return await likeArticleController.handle(req, res);
  }
);

articlesRoutes.delete(
  "/:articleId/dislike",
  authMiddleware.auth,
  async (req, res) => {
    return await dislikeArticleController.handle(req, res);
  }
);