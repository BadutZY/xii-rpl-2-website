import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description?: string;
}

function setMetaTag(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Mengatur document.title dan meta description setiap kali halaman berpindah.
 * Menggantikan fungsi `head()` bawaan TanStack Router pada setup React biasa (SPA).
 */
export function useDocumentMeta({ title, description }: DocumentMeta) {
  useEffect(() => {
    document.title = title;
    setMetaTag("og:title", title, "property");

    if (description) {
      setMetaTag("description", description);
      setMetaTag("og:description", description, "property");
    }
  }, [title, description]);
}
