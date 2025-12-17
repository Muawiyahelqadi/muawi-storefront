import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "use-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {},
    onError() {
      // Completely suppress - no logging, no throwing
    },

    getMessageFallback({ key }) {
      return key;
    },
  };
});
