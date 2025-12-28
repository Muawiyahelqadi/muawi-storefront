import React from "react";
import { fetchArticleBySlug } from "@/src/sanity/queries/article";
import ArticleDetailPage from "@/src/app/[locale]/articles/[slug]/article-client";
import { notFound } from "next/navigation";
import { PageProps } from "@/src/types/page";

type Props = PageProps<{ slug: string }>;

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  console.log("article", article);
  if (!article) {
    return notFound();
  }

  return <ArticleDetailPage article={article} />;
};

export default Page;
