import { useState } from "react";
import CommentComponent from "./CommentComponent";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import FormCreateComment from "./FormCreateComment";
import { verifyIfHasComments } from "@/utils/verifyIfHasComments";

export default function CommentsComponent({ comments, articleId }) {
  const [showComments, setShowComments] = useState(
    verifyIfHasComments(comments)
  );

  const [showFormCreateComment, setShowFormCreateComment] = useState(false);

  return (
    <section className="container mx-auto w-full xl:px-14 px-7 flex flex-col gap-10 pt-5">
      <h1 className="text-xl flex justify-center items-center gap-5">
        Comentários
        <Icon
          icon="jam:write-f"
          className="cursor-pointer transition-all duration-300 hover:scale-95"
          onClick={() => setShowFormCreateComment(!showFormCreateComment)}
        />
      </h1>

      {showFormCreateComment && <FormCreateComment articleId={articleId} />}

      <div className="divide-y w-full flex flex-col justify-center items-center">
        <div className="max-h-96 overflow-hidden overflow-y-auto py-5">
          {showComments ? (
            comments
              .slice()
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((comment, index) => (
                <CommentComponent key={index} comment={comment} />
              ))
          ) : (
            <span className="text-xs text-gray-500 px-10">
              *Não há comentários
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
