import { useEffect } from "react";

export function useDocumentTitle(title: string, lang?: string): void {
  useEffect(() => {
    const prevTitle = document.title;
    const prevLang = document.documentElement.lang;
    document.title = title;
    if (lang) document.documentElement.lang = lang;
    return () => {
      document.title = prevTitle;
      if (lang) document.documentElement.lang = prevLang;
    };
  }, [title, lang]);
}
