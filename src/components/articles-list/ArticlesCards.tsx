"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import { Article } from "@/src/sanity/types/sections.types";
import Image from "next/image";
import { getImageUrl } from "@/src/utilities/image-builder";
import Link from "next/link";
import { getUrlByPage } from "@/src/routes";
import { fetchArticles } from "@/src/sanity/queries/article";
import useInfiniteScroll from "react-infinite-scroll-hook";

interface ArticleCardsProps {
  initialArticles: Article[];
  limit: number;
}

const ArticleCards: React.FC<ArticleCardsProps> = ({
  initialArticles,
  limit,
}) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(articles.length >= limit);
  const [offset, setOffset] = useState(limit);

  const loadMoreArticles = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const newArticles = await fetchArticles(offset, offset + limit);

      setArticles((prev) => {
        const all = [...prev, ...newArticles];
        return Array.from(new Map(all.map((s) => [s._id, s])).values());
      });
      setHasMore(newArticles.length >= limit);
      setOffset((prev) => prev + limit);
    } finally {
      setLoading(false);
    }
  }, [limit, loading]);

  const [loaderRef] = useInfiniteScroll({
    loading: loading,
    hasNextPage: hasMore,
    onLoadMore: loadMoreArticles,
    disabled: false,
    rootMargin: "0px 0px 200px 0px",
  });

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((post, index) => {
          const url = getUrlByPage("article-details", post.slug.current);

          return (
            <article
              key={post._id}
              className="group animate-slide-up"
              style={{ animationDelay: `${(index % 9) * 80}ms` }}
            >
              <div className="h-full bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-3">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <Image
                    src={getImageUrl(post.featuredImage)}
                    alt={post.title}
                    width={1300}
                    height={899}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${post.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                  />
                </div>

                {/* Content */}
                <div className="p-7 space-y-4">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <Link
                    href={url}
                    className="text-2xl font-bold text-slate-900 min-h-[60px] leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2"
                  >
                    {post.title}
                  </Link>

                  {/* Excerpt */}
                  <p className="text-slate-600 leading-relaxed line-clamp-3 min-h-[78px]">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-medium text-slate-500">
                      {post.readTime} read
                    </span>
                    <Link
                      href={getUrlByPage("article-details", post.slug.current)}
                      className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                    >
                      Read more
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Accent bar */}
                <div className={`h-1 bg-gradient-to-r ${post.color}`} />
              </div>
            </article>
          );
        })}
      </div>

      {/* Loading indicator and intersection observer target */}
      <div ref={loaderRef} className="mt-12 flex justify-center">
        {loading && (
          <div className="flex items-center gap-3 text-slate-600">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <span className="font-medium">Loading more articles...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleCards;
