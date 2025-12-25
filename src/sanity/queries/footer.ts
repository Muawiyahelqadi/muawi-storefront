import { groq } from "next-sanity";
import { sanityFetch } from "@/src/sanity/lib/fetch";
import { Footer } from "@/src/sanity/types/sections.types";
import { languageFilter } from "@/src/sanity/types/queries.types";
import { SCHEMA_TYPES } from "@/src/sanity/schemas/schema-types";

export async function fetchFooterByType() {
  const query = groq`*[_type == $type && ${languageFilter}][0]{ 
      ...
    }
  `;

  return sanityFetch<Footer>(query, {
    type: SCHEMA_TYPES.Footer,
  });
}
