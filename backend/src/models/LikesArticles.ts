import { IUsers } from "./Users";

export interface ILikesArticles {
  id: string;
  user_id: string;
  user: IUsers;
  article_id: string;
  created_at: Date;
  updated_at: Date;
}
