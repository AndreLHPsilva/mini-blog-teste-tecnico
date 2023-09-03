import { ILikesComments } from "@models/LikesComments";

export interface ICreateLikesCommentsDTO {
  user_id: string;
  article_id: string;
  comment_id: string;
}

export interface IFindLikeCommentByParamsDTO {
  user_id: string;
  article_id: string;
  comment_id: string;
}

export interface ILikesCommentsRepository {
  create(data: ICreateLikesCommentsDTO): Promise<ILikesComments>;
  destroy(like_comment_id: string): Promise<void>

  findById(like_comment_id: string): Promise<ILikesComments | null>;
  findByCommentId(comment_id: string): Promise<ILikesComments | null>;
  findByParams(data: IFindLikeCommentByParamsDTO): Promise<ILikesComments | null>;
}
