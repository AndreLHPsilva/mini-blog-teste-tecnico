import { IArticlesRepository } from "@database/repositories/IArticlesRepository";
import { ICommentsRepository } from "@database/repositories/ICommentsRepository";
import { ILikesArticlesRepository } from "@database/repositories/ILikesArticlesRepository";
import { ILikesCommentsRepository } from "@database/repositories/ILikesCommentsRepository";
import { IUserRepository } from "@database/repositories/IUserRepository";
import { ArticlesRepository } from "@database/repositories/externalApi/ArticlesRepository";
import { CommentsPrismaRepository } from "@database/repositories/prisma/CommentsPrismaRepository";
import { LikesArticlesPrismaRepository } from "@database/repositories/prisma/LikesArticlesPrismaRepository";
import { LikesCommentsPrismaRepository } from "@database/repositories/prisma/LikesCommentsPrismaRepository";

import { UserPrismaRepository } from "@database/repositories/prisma/UserPrismaRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserPrismaRepository
);
container.registerSingleton<ILikesArticlesRepository>(
  "LikesArticlesRepository",
  LikesArticlesPrismaRepository
);
container.registerSingleton<ILikesCommentsRepository>(
  "LikesCommentsRepository",
  LikesCommentsPrismaRepository
);

container.registerSingleton<ICommentsRepository>(
  "CommentsRepository",
  CommentsPrismaRepository
);

container.registerSingleton<IArticlesRepository>(
  "ArticlesRepository",
  ArticlesRepository
);
