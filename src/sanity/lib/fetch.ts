// sanity/lib/fetch.ts
import type { QueryParams } from "next-sanity";
import { getLocale } from "next-intl/server";
import { client } from "@/src/sanity/lib/client";
import { routing } from "@/src/i18n/routing";
import { getLocaleClientSide } from "@/src/i18n/utilities";

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

  let locale;
  if (typeof window === "undefined") {
    locale = (await getLocale()) || routing.defaultLocale;
  } else {
    locale = getLocaleClientSide();
  }

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
