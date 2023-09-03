import express from "express";
import { articlesRoutes } from "./articles";
import { userRoutes } from "./user.routes";

export const routes = express.Router();

routes.use("/articles", articlesRoutes);
routes.use("/users", userRoutes);