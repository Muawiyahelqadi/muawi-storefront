import { groq } from "next-sanity";
import { sanityFetch } from "@/src/sanity/lib/fetch";
import { Page } from "@/src/sanity/types/sections.types";
import { languageFilter } from "@/src/sanity/types/queries.types";
import { SCHEMA_TYPES } from "@/src/sanity/schemas/schema-types";

export async function fetchHomePageByType() {
  const query = groq`*[_type == $type && ${languageFilter}][0]{ 
      title,
      sections[]{
        ...,
      },
    }
  `;

  return sanityFetch<Page>(query, {
    type: SCHEMA_TYPES.HOME_PAGE,
  });
}
