import Layout from "@/components/Global/Layout";
import Article from "@/components/HomePageComponents/ArticleComponent";
import api from "@/services/api";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home({ articlesData, totalArticles }) {
  const [articles, setArticles] = useState(articlesData);

  const [startIndexArticle, setStartIndexArticle] = useState(0);
  const [endIndexArticle, setEndIndexArticle] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  async function getMoreArticles() {
    const start = startIndexArticle + 10;
    const end = endIndexArticle + 10;

    setStartIndexArticle(start);
    setEndIndexArticle(end);

    if (totalArticles == 0 || totalArticles < end) {
      setHasMore(false);
      return;
    }

    if (end == totalArticles) {
      setHasMore(false);
    }

    try {
      const resp = await api.get(`/articles?start=${start}&end=${end}`);

      setArticles([...articles, ...resp.data.data.articles]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <main className="w-full flex flex-col items-center mt-10 gap-5 flex-1">
        <h2 className="font-bold sm:text-3xl text-xl">Artigos</h2>
        <section className="bg-gray-100 rounded-xl">
          <InfiniteScroll
            dataLength={articles?.length}
            next={getMoreArticles}
            hasMore={true}
            scrollThreshold={0.8}
            endMessage={
              <div className="my-10 flex w-full items-center justify-center">
                <h1>Acabou</h1>
              </div>
            }
            // loader={<LoadingTableComponent />}
            loader={<span>Carregando...</span>}
            className="divide-y-2"
          >
            {articles?.length > 0 ? (
              articles.map((article) => (
                <Article key={article.id} article={article} />
              ))
            ) : (
              <span>Nenhum artigo encontrado</span>
            )}
          </InfiniteScroll>
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [articlesPaginate, totalArticles] = await Promise.all([
      api.get("/articles?start=0&end=10"),
      axios.get("https://news-api.lublot.dev/api/posts", {
        headers: { "Content-Type": "application/json" },
      }),
    ]);

    return {
      props: {
        articlesData: articlesPaginate.data.data.articles,
        totalArticles: totalArticles.data.length,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
