import React from "react";
import { fetchArticlesListPage } from "@/src/sanity/queries/articles-list";
import ArticleCards from "@/src/components/articles-list/ArticlesCards";
import { fetchArticles } from "@/src/sanity/queries/article";

const LIMIT = 6;
const ArticlesListPage = async () => {
  const content = await fetchArticlesListPage();
  const initialArticles = (await fetchArticles(0, LIMIT)) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-18">
      {/* Decorative elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-200/30 to-purple-200/30 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <header className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block">
              {content.title && (
                <h1 className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 pb-2">
                  {content.title}
                </h1>
              )}
              <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 rounded-full mt-2 animate-pulse-slow" />
            </div>
            {content.description && (
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                {content.description}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Article Grid with Load More */}
      <main className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <ArticleCards initialArticles={initialArticles} limit={LIMIT} />
        </div>
      </main>
    </div>
  );
};

export default ArticlesListPage;
