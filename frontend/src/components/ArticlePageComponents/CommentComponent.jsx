import { useNotification } from "@/hooks/useNotification";
import api from "@/services/api";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ButtonLike from "../Global/ButtonLike";
import ModalEditComment from "./ModalEditComment";
import ModalDeletionComment from "./ModalDeletionComment";
import { verifyIfLike } from "@/utils/verifyIfLike";
import { subtractionLike } from "@/utils/subtractionLike";
import { sumLike } from "@/utils/sumLike";
import { verifyIsMyComment } from "@/utils/verifyIsMyComment";

export default function CommentComponent({ comment }) {
  const router = useRouter();
  const { data: session, update } = useSession();

  const [showIconMenuComment, setShowIconMenuComment] = useState(
    verifyIsMyComment({ comment, session })
  );

  const { Error } = useNotification();

  const publishedDate = moment(comment?.created_at).format("DD-MM-YYYY");

  const menuCommentRef = useRef(null);

  const [showMenuComment, setShowMenuComment] = useState(false);
  const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [liked, setLiked] = useState(
    verifyIfLike({ item: comment, session, type: "comment" })
  );

  async function handleLikeArticle() {
    if (!session) {
      router.push("/entrar");
      return;
    }

    const current_state = !liked;

    try {
      if (!current_state) {
        await api.delete(
          `/articles/${comment.article_id}/comment/${comment.id}/dislike`
        );
        const newUserData = await api.get(`/users/recover-data`);

        comment.likes_total = subtractionLike(comment.likes_total);
        setLiked(false);

        await update(newUserData.data);
      } else {
        await api.post(
          `/articles/${comment.article_id}/comment/${comment.id}/like`
        );
        const newUserData = await api.get(`/users/recover-data`);

        comment.likes_total = sumLike(comment.likes_total);
        setLiked(true);

        await update(newUserData.data);
      }
    } catch (error) {
      if (error.response) {
        Error(
          error.response.data.message ??
            "Erro inesperado, se persistir, contate o administrador"
        );
      }
    }
  }

  useEffect(() => {
    setLiked(verifyIfLike({ item: comment, session, type: "comment" }));
  }, []);

  useEffect(() => {
    setLiked(verifyIfLike({ item: comment, session, type: "comment" }));
  }, [session, comment]);

  function onCloseModal() {
    setShowModalEdit(false);
    setShowConfirmDeletion(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuCommentRef.current &&
        !menuCommentRef.current.contains(event.target)
      ) {
        setShowMenuComment(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowIconMenuComment(verifyIsMyComment({ comment, session }));
  }, [session]);

  return (
    <>
      <ModalEditComment
        showModal={showModalEdit}
        onClose={onCloseModal}
        comment={comment}
      />

      <ModalDeletionComment
        showModal={showConfirmDeletion}
        onClose={onCloseModal}
        comment={comment}
      />

      <section className="md:max-w-2xl lg:w-full grid sm:grid-cols-4 grid-cols-1 sm:gap-0 gap-5 odd:bg-zinc-100 rounded-md px-3 py-7">
        <div className="flex flex-col sm:col-span-3">
          <span className="text-gray-500 sm:text-base text-xs sm:font-normal font-bold">
            {comment?.user.name}
          </span>
          <p className="pl-4 out">{comment?.content}</p>
        </div>

        <div className="flex sm:justify-end">
          <div className="flex sm:flex-col sm:justify-center flex-row-reverse sm:gap-3 gap-2 sm:col-span-1">
            <span className="flex items-center sm:gap-2 font-bold text-gray-500 sm:text-base text-xs">
              <div className="flex items-center gap-2">
                <div className="flex items-center sm:gap-2 text-gray-400 sm:text-sm text-xs">
                  <Icon
                    icon="streamline:interface-calendar-date-month-thirty-thirty-calendar-date-week-day-month"
                    color="#71717a"
                  />
                </div>
                <span className="sm:text-base text-[10px] sm:font-normal font-bold">
                  {publishedDate}
                </span>
              </div>
              <div className="relative">
                {showIconMenuComment && (
                  <>
                    <Icon
                      icon="pepicons-pop:dots-y"
                      className="cursor-pointer hover:scale-110 transition-all duration-300"
                      width={20}
                      onClick={() => setShowMenuComment(!showMenuComment)}
                    />
                    {showMenuComment && (
                      <nav
                        className="absolute z-50 right-5 top-0 flex flex-col bg-white px-4 py-3 rounded border shadow"
                        ref={menuCommentRef}
                      >
                        <span
                          className="cursor-pointer hover:scale-90 transition-all duration-300"
                          onClick={() => {
                            setShowModalEdit(true);
                            setShowMenuComment(false);
                          }}
                        >
                          Editar
                        </span>
                        <span
                          className="cursor-pointer hover:scale-90 transition-all duration-300"
                          onClick={() => {
                            setShowConfirmDeletion(true);
                            setShowMenuComment(false);
                          }}
                        >
                          Excluir
                        </span>
                      </nav>
                    )}
                  </>
                )}
              </div>
            </span>
            <div className="flex items-center gap-2">
              <ButtonLike
                onLikeToggle={handleLikeArticle}
                initialLiked={liked}
              />

              <span className="sm:text-base text-xs">
                {comment?.likes_total <= 1
                  ? `${comment?.likes_total} curtida`
                  : `${comment?.likes_total} curtidas`}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
