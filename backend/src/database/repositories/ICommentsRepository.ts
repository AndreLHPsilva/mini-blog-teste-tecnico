import { IComments } from "@models/Comments";

export interface ICreateCommentDTO {
  user_id: string;
  article_id: string;
  content: string;
}

export interface IUpdateCommentDTO {
  comment_id: string;
  content: string;
}

export interface ICommentsRepository {
  getByArticleId(article_id: string): Promise<IComments[]>;
  findById(comment_id: string): Promise<IComments | null>;
  
  create(data: ICreateCommentDTO): Promise<IComments>;
  update(data: IUpdateCommentDTO): Promise<IComments>;
  destroy(comment_id: string): Promise<void>;
}
