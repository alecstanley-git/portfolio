import { useEffect } from "react";

const SUFFIX = "Alec Stanley";

/** Sets the document title and meta description for a route. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · ${SUFFIX}` : `${SUFFIX} — technical portfolio`;
  }, [title]);

  useEffect(() => {
    if (!description) return;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", description);
  }, [description]);
}
