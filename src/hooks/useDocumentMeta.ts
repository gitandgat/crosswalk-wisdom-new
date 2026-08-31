import { useEffect } from "react";

/**
 * Overrides document.title and the meta description tag for the lifetime of
 * the calling component, restoring the previous values on unmount. index.html
 * ships one static title/description for the whole SPA, so every route needs
 * this to be distinguishable to search engines and link previews.
 */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = metaDesc?.content ?? "";

    document.title = title;
    if (metaDesc) metaDesc.content = description;

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.content = prevDescription;
    };
  }, [title, description]);
}
