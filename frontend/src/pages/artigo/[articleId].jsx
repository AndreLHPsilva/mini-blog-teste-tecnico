import ArticleComponent from "@/components/ArticlePageComponents/ArticleComponent";
import Layout from "@/components/Global/Layout";
import api from "@/services/api";

export default function Article({ articleData }) {
  return (
    <>
      <Layout>
        <main className="flex-1 w-full flex justify-center items-center py-10">
          <section className="container mx-auto">
            <ArticleComponent article={articleData} />
          </section>
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { articleId } = ctx.query;

  if (!articleId) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  try {
    const articleResponse = await api.get(`/articles/${articleId}`);

    return {
      props: {
        articleData: articleResponse.data.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
