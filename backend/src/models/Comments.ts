import { ILikesComments } from "./LikesComments";
import { IUsers } from "./Users";

export interface IComments {
  id: string;
  user_id: string;
  user?: Partial<IUsers>;
  article_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  LikesComments?: ILikesComments[];

  likes_total?: number;
}
