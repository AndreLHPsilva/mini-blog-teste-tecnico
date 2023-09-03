import { Icon } from "@iconify/react";
import Tag from "../Global/Tag";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNotification } from "@/hooks/useNotification";
import { useSession } from "next-auth/react";
import CommentsComponent from "./CommentsComponent";
import { useRouter } from "next/router";
import api from "@/services/api";
import ButtonLike from "../Global/ButtonLike";
import { verifyIfLike } from "@/utils/verifyIfLike";
import { subtractionLike } from "@/utils/subtractionLike";
import { sumLike } from "@/utils/sumLike";

export default function ArticleComponent({ article }) {
  const publishedDate = moment(article?.published).format("DD-MM-YYYY");

  const router = useRouter();

  const { data: session, update } = useSession();

  const { Success, Error, WaitToDisappear } = useNotification();

  const [liked, setLiked] = useState(verifyIfLike({ item: article, session }));

  async function handleLikeArticle() {
    if (!session) {
      router.push("/entrar");
      return;
    }

    const current_state = !liked;

    try {
      if (!current_state) {
        await api.delete(`/articles/${article.id}/dislike`);
        const newUserData = await api.get(`/users/recover-data`);

        article.likes_total = subtractionLike(article.likes_total);
        setLiked(false);

        await update(newUserData.data);
      } else {
        await api.post(`/articles/${article.id}/like`);
        const newUserData = await api.get(`/users/recover-data`);

        article.likes_total = sumLike(article.likes_total);
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
    setLiked(verifyIfLike({ item: article, session }));
  }, []);

  useEffect(() => {
    setLiked(verifyIfLike({ item: article, session }));
  }, [session, article]);

  return (
    <section className="divide-y divide-gray-100 flex flex-col gap-14">
      <section className="grid xl:grid-cols-2 xl:gap-10 gap-7 xl:px-14 px-7 xl:divide-x container mx-auto">
        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="font-bold self-start sm:text-2xl text-sm">
            {article?.title}
          </h2>
          <img
            src={article?.coverImage}
            alt="Imagem do artigo"
            className="object-cover rounded-md shadow-lg"
          />
          <div className="flex justify-between w-full">
            <h3 className="font-bold text-gray-400 sm:text-sm text-xs">
              Autor:{" "}
              <span className="text-gray-500 sm:text-base text-xs sm:font-normal font-bold">
                {article?.author}
              </span>
            </h3>
            <span className="flex items-center gap-2 font-bold text-gray-500 sm:text-base text-xs">
              <div className="flex items-center gap-2 text-gray-400 sm:text-sm text-xs">
                <Icon
                  icon="streamline:interface-calendar-date-month-thirty-thirty-calendar-date-week-day-month"
                  color="#71717a"
                />
                Publicado:
              </div>
              <span className="sm:text-base text-xs sm:font-normal font-bold">
                {publishedDate}
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <ButtonLike
                initialLiked={liked}
                onLikeToggle={handleLikeArticle}
              />

              <span>
                {article?.likes_total <= 1
                  ? `${article?.likes_total} curtida`
                  : `${article?.likes_total} curtidas`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:comments-text-outline" color="gray" />
              <span>
                {article?.comments_total <= 1
                  ? `${article?.comments_total} comentário`
                  : `${article?.comments_total} comentários`}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 xl:pl-10 w-full justify-center">
          <div className="flex flex-col gap-3">
            <p className="sm:text-sm text-xs">{article?.content}</p>
          </div>
          <div className="flex gap-3 sm:text-base text-xs">
            {article?.tags.length > 0 &&
              article?.tags.map((tag, index) => <Tag key={index} tag={tag} />)}
          </div>
        </div>
      </section>

      <CommentsComponent comments={article?.comments} articleId={article?.id} />
    </section>
  );
}
