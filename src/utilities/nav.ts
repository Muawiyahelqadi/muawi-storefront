export type ParsedUrl = { path: string; hash: string };

export const parseUrl = (url: string): ParsedUrl => {
  if (url.startsWith("#")) return { path: "/", hash: url.slice(1) };
  const [rawPath, hash = ""] = url.split("#");
  return { path: rawPath || "/", hash };
};

export const localizeHref = (
  { path, hash }: ParsedUrl,
  locale: string,
): string => {
  const localized = path === "/" ? `/${locale}` : `/${locale}${path}`;
  return hash ? `${localized}#${hash}` : localized;
};

export const stripLocale = (pathname: string, locale: string): string =>
  pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "") || "/";