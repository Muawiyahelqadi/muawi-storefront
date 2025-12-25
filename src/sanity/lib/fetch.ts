// sanity/lib/fetch.ts
import type { QueryParams } from "next-sanity";
import { getLocale } from "next-intl/server";
import { client } from "@/src/sanity/lib/client";
import { routing } from "@/src/i18n/routing";

export async function sanityFetch<T>(
  query: string,
  options: QueryParams = {},
): Promise<T> {
  const {
    tags = [],
    revalidate = 300,
    useCdn = true,
    perspective = "published",
    ...params
  } = options;

  const locale = (await getLocale()) || routing.defaultLocale;

  return client.fetch<T>(
    query,
    { ...params, locale },
    {
      useCdn,
      perspective,
      next: { revalidate, tags },
    },
  );
}
