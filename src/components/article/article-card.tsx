"use client";

import { Clock } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "@/src/utilities/image-builder";
import { MiniArticle } from "@/src/sanity/types/sections.types";
import useTranslate from "@/src/hook/useTranslate";
import Image from "next/image";

const slideUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface Props {
  index: number;
  article: MiniArticle;
}

const ArticleCard = ({ article, index }: Props) => {
  const translate = useTranslate();
  return (
    <motion.div
      key={article._id}
      className="group cursor-pointer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={slideUpVariant}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={getImageUrl(article.featuredImage)}
              width={400}
              height={400}
              className="w-full h-full object-cover"
              alt={article.title}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="w-4 h-4" />
            <span>
              {article.readTime} {translate("min_read")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
