import { IComments } from "./Comments";
import { ILikesArticles } from "./LikesArticles";

export interface IArticles {
  id: string;
  title: string;
  author: string;
  published: string;
  coverImage: string;
  tags: string[];

  comments?: IComments[];
  likes?: ILikesArticles[];

  comments_total?: number;
  likes_total?: number;
}
