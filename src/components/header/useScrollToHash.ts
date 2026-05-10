"use client";

import { useEffect } from "react";

export function useScrollToHash(pathname: string) {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView();
      return;
    }

    // section not in DOM yet — wait for it to mount
    const obs = new MutationObserver(() => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView();
        obs.disconnect();
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });

    const timeout = setTimeout(() => obs.disconnect(), 5000);
    return () => {
      obs.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname]);
}