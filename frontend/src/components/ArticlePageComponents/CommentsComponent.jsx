import { useState } from "react";
import CommentComponent from "./CommentComponent";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import FormCreateComment from "./FormCreateComment";
import { verifyIfHasComments } from "@/utils/verifyIfHasComments";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CommentsComponent({ comments, articleId }) {
  const [showComments, setShowComments] = useState(
    verifyIfHasComments(comments)
  );

  const router = useRouter();

  const { data: session } = useSession();


  const [showFormCreateComment, setShowFormCreateComment] = useState(false);

  function handleShowModalCreateComment(){
    if(!session){
      router.push("/entrar");
      return
    }

    setShowFormCreateComment(!showFormCreateComment)
  }

  return (
    <section className="container mx-auto w-full xl:px-14 px-7 flex flex-col gap-10 pt-5">
      <h1 className="text-xl flex justify-center items-center gap-5">
        Comentários
        <Icon
          icon="jam:write-f"
          className="cursor-pointer transition-all duration-300 hover:scale-95"
          onClick={handleShowModalCreateComment}
        />
      </h1>

      {showFormCreateComment && <FormCreateComment articleId={articleId} />}

      <div className="divide-y w-full flex flex-col justify-center items-center">
        <div className="max-h-96 md:max-w-2xl lg:w-full w-full overflow-hidden overflow-y-auto overflow-x-auto py-5">
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
