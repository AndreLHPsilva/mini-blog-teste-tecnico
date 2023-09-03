import { ICommentsRepository } from "@database/repositories/ICommentsRepository";
import { ApiError } from "@errors/ApiError";
import { IComments } from "@models/Comments";
import { inject, injectable } from "tsyringe";

interface IEditCommentDTO {
  commentId: string;
  content: string;
}

@injectable()
class UpdateUseCase {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: ICommentsRepository
  ) {}
  async execute({ commentId, content }: IEditCommentDTO): Promise<IComments> {
    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new ApiError("Comentário não encontrado.");
    }

    const commentUpdated = await this.commentsRepository.update({
      comment_id: commentId,
      content,
    });

    commentUpdated.user!.password = undefined;

    return commentUpdated;
  }
}

export { UpdateUseCase };
