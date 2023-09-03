import { IComments } from "./Comments";
import { IUsers } from "./Users";

export interface ILikesComments {
  id: string;
  user_id: string;
  user?: IUsers;
  article_id: string;
  comment_id: string;
  comment?: IComments;
  created_at: Date;
  updated_at: Date;
}
