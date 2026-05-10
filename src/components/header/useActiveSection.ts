"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("");
  const key = sectionIds.join(",");

  useEffect(() => {
    if (!sectionIds.length) return;

    const visible = new Set<string>();
    const observed = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setActiveSection(sectionIds.find((id) => visible.has(id)) ?? "");
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    // observe whatever's currently in the DOM
    const observeAvailable = () => {
      for (const id of sectionIds) {
        if (observed.has(id)) continue;
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observed.add(id);
        }
      }
      return observed.size === sectionIds.length;
    };

    // watch for sections that mount later (Sanity content, lazy loading)
    let mutationObs: MutationObserver | null = null;
    if (!observeAvailable()) {
      mutationObs = new MutationObserver(() => {
        if (observeAvailable()) {
          mutationObs?.disconnect();
          mutationObs = null;
        }
      });
      mutationObs.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      mutationObs?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return activeSection;
}