"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Share2, ChevronLeft } from "lucide-react";
import { Article } from "@/src/sanity/types/sections.types";
import { getImageUrl } from "@/src/utilities/image-builder";
import useTranslate from "@/src/hook/useTranslate";
import Image from "next/image";
import ContentBlock from "@/src/components/ui/portableTextComponents";
import ArticleCard from "@/src/components/article/article-card";
import { toast } from "sonner";
import Link from "next/link";
import { getUrlByPage } from "@/src/routes";

// Animation variants
const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface Props {
  article: Article;
}

export default function ArticleDetailPage({ article }: Props) {
  const translate = useTranslate();
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(translate("copied_to_clipboard"), {
      position: "bottom-center",
    });
  };

  console.log({ article });
  return (
    <div className="min-h-screen bg-white pt-18">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"
          style={{ width: `${readProgress}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-200 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href={getUrlByPage("articles")}>
              <motion.div
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">
                  {translate("back_to_articles")}
                </span>
              </motion.div>
            </Link>

            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.button
                  onClick={() => copyLink()}
                  className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative">
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-8">
          {/* Category Badge */}
          {article.category && (
            <motion.div
              className="mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeInVariant}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-full">
                {article.category.name}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-6"
            initial="hidden"
            animate="visible"
            variants={slideUpVariant}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {article.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-2xl text-slate-600 leading-relaxed mb-8 font-light"
            initial="hidden"
            animate="visible"
            variants={slideUpVariant}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {article.subtitle}
          </motion.p>

          {/* Meta Info */}
          <motion.div
            className="flex flex-wrap items-center gap-6 text-slate-600 mb-8"
            initial="hidden"
            animate="visible"
            variants={slideUpVariant}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-500" />
              <span className="font-medium">
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-500" />
              <span className="font-medium">
                {article.readTime} {translate("min_read")}
              </span>
            </div>
          </motion.div>

          {/* Author Info */}
          <motion.div
            className="flex items-start gap-4 p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100"
            initial="hidden"
            animate="visible"
            variants={slideUpVariant}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src={getImageUrl(article.author.avatar)}
              alt={article.author.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900 text-lg mb-0">
                  {article.author.name}
                </h3>
                <User className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-sm text-teal-700 font-medium mb-2">
                {article.author.title}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {article.author.bio}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Feature Image */}
        <motion.div
          className="max-w-5xl mx-auto px-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={slideUpVariant}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={getImageUrl(article.featuredImage)}
              alt={article.title}
              width={500}
              height={500}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </motion.div>
      </header>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 pb-16">
        {article.content && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUpVariant}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ContentBlock>{article.content}</ContentBlock>
          </motion.div>
        )}

        {/* Tags */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            {translate("topics_covered")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {article.tags?.map((tag, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-slate-900 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariant}
              transition={{ duration: 0.6 }}
            >
              {translate("continue_reading")}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {article.relatedArticles?.map((related, index) => (
                <ArticleCard
                  article={related}
                  key={article._id}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
