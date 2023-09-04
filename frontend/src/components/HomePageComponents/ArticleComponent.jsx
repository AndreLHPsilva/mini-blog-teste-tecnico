import Link from "next/link";
import Tag from "../Global/Tag";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { useNotification } from "@/hooks/useNotification";
import ButtonLike from "../Global/ButtonLike";
import { verifyIfLike } from "@/utils/verifyIfLike";

export default function Article({ article }) {
  const { data: session, update } = useSession();

  const { Error } = useNotification();
  const router = useRouter();

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

        const value = article.likes_total - 1;

        if (value <= 0) {
          article.likes_total = 0;
        } else {
          article.likes_total = value;
        }

        setLiked(false);

        await update(newUserData.data);
      } else {
        await api.post(`/articles/${article.id}/like`);
        const newUserData = await api.get(`/users/recover-data`);

        article.likes_total++;

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
    <div className="md:max-w-2xl sm:max-w-md max-w-280px p-5 flex flex-col gap-3 mt-5 first:mt-0">
      <div className="md:w-640px sm:w-96 w-280px">
        <img
          src={article.coverImage}
          alt="Imagem do artigo"
          className="object-cover rounded-md shadow-lg"
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ButtonLike
              sizeIcon={24}
              onLikeToggle={handleLikeArticle}
              initialLiked={liked}
            />

            <span>
              {article?.likes_total <= 1
                ? `${article?.likes_total} curtida`
                : `${article?.likes_total} curtidas`}
            </span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push(`/artigo/${article.id}`)}
          >
            <Icon icon="mdi:comments-text-outline" color="gray" />
            <span>
              {article?.comments_total <= 1
                ? `${article?.comments_total} comentário`
                : `${article?.comments_total} comentários`}
            </span>
          </div>
        </div>
      </div>
      <div className="md:w-640px sm:w-96 w-280px flex flex-col gap-2">
        <h3 className="font-bold sm:text-base text-sm">{article.title}</h3>
        <p className="line-clamp-3 text-gray-600 sm:text-sm text-xs">
          {article.content}
        </p>
      </div>
      <div className="flex gap-3">
        <div className="flex gap-3 sm:text-base text-xs">
          {article.tags.length > 0 &&
            article.tags.map((tag, index) => <Tag key={index} tag={tag} />)}
        </div>
      </div>
      <div className="self-start">
        <Link
          href={`/artigo/${article.id}`}
          className="underline text-blue-500 font-semibold transition-all duration-300 hover:opacity-80 sm:text-base text-sm"
          title="Veja tudo sobre este artigo"
        >
          Ler Artigo
        </Link>
      </div>
    </div>
  );
}
