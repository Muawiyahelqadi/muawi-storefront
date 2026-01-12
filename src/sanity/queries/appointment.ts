import { groq } from "next-sanity";
import { sanityFetch } from "@/src/sanity/lib/fetch";
import { languageFilter } from "@/src/sanity/types/queries.types";
import { SCHEMA_TYPES } from "@/src/sanity/schemas/schema-types";
import { Appointment } from "@/src/sanity/types/sections.types";

export async function fetchAppointmentPageByType() {
  const query = groq`*[_type == $type && ${languageFilter}] | order(createdAt desc) { 
        ...,
    }
  `;

  return sanityFetch<Appointment[]>(query, {
    type: SCHEMA_TYPES.Appointment,
  });
}
