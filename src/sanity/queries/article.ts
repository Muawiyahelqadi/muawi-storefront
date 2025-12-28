import { groq } from "next-sanity";
import { sanityFetch } from "@/src/sanity/lib/fetch";
import { Article } from "@/src/sanity/types/sections.types";
import { languageFilter } from "@/src/sanity/types/queries.types";
import { SCHEMA_TYPES } from "@/src/sanity/schemas/schema-types";

export const baseArticleQuery = groq`_type == "${SCHEMA_TYPES.ARTICLE}" && ${languageFilter} && status == "published"`;
export async function fetchArticleBySlug(slug: string) {
  const query = groq`*[${baseArticleQuery} && slug.current == $slug][0]{ 
      ...,
      category->{
        ...
      },
      author->{
        ...
      },
    }
  `;

  return sanityFetch<Article>(query, {
    slug,
  });
}

export async function fetchArticles(from: number, to: number) {
  const query = groq`*[${baseArticleQuery}][${from}...${to}]{ 
      ...,
      category->{
        ...
      },
      author->{
        ...
      },
    }
  `;

  return sanityFetch<Article[]>(query);
}
