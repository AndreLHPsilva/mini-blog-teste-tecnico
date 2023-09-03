import { AuthMiddleware } from "@middlewares/AuthMiddleware";
import { DislikeController } from "@modules/Articles/Comments/usecases/Dislike/DislikeController";
import { LikeController } from "@modules/Articles/Comments/usecases/Like/LikeController";
import { UpdateController } from "@modules/Articles/Comments/usecases/Update/UpdateController";
import { CreateCommentArticleController } from "@modules/Articles/usecases/CreateCommentArticle/CreateCommentArticleController";
import { RemoveCommentArticleController } from "@modules/Articles/usecases/RemoveCommentArticle/RemoveCommentArticleController";
import express from "express";

export const commentRoutes = express.Router();
const authMiddleware = new AuthMiddleware();

const createCommentArticleController = new CreateCommentArticleController();
const removeCommentArticleController = new RemoveCommentArticleController();

const updateController = new UpdateController();

const likeController = new LikeController();
const dislikeController = new DislikeController();

commentRoutes.post("/:articleId/comment", authMiddleware.auth, async (req, res) => {
  return await createCommentArticleController.handle(req, res);
});

commentRoutes.delete("/comment/:commentId", authMiddleware.auth, async (req, res) => {
  return await removeCommentArticleController.handle(req, res);
});

commentRoutes.patch("/comment/:commentId", authMiddleware.auth, async (req, res) => {
  return await updateController.handle(req, res);
});

commentRoutes.post("/:articleId/comment/:commentId/like", authMiddleware.auth, async (req, res) => {
  return await likeController.handle(req, res);
});

commentRoutes.delete("/:articleId/comment/:commentId/dislike", authMiddleware.auth, async (req, res) => {
  return await dislikeController.handle(req, res);
});