import { IArticlesRepository } from "@database/repositories/IArticlesRepository";
import { ICommentsRepository } from "@database/repositories/ICommentsRepository";
import { ILikesArticlesRepository } from "@database/repositories/ILikesArticlesRepository";
import { ILikesCommentsRepository } from "@database/repositories/ILikesCommentsRepository";
import { ApiError } from "@errors/ApiError";

import { inject, injectable } from "tsyringe";

@injectable()
class DislikeUseCase {
  constructor(
    @inject("LikesCommentsRepository")
    private likesCommentsRepository: ILikesCommentsRepository
  ) {}

  async execute(commentId: string): Promise<void> {
    const likeComment = await this.likesCommentsRepository.findByCommentId(
      commentId
    );

    if (!likeComment) {
      throw new ApiError("Curtida não encontrada.");
    }

    await this.likesCommentsRepository.destroy(likeComment.id);
  }
}

export { DislikeUseCase };
