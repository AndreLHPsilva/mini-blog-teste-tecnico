import { IUser } from "./User";

export interface ILikesArticles {
  id: string;
  user_id: string;
  user: IUser;
  article_id: string;
  created_at: Date;
  updated_at: Date;
}
