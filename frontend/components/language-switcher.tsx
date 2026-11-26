"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOCALES, type TranslationLink } from "@/lib/i18n";
import { dictionary } from "@/lib/dictionary";

// The header is drawn by the layout, which does not know which page is open.
// Each page tells it here which other languages that page exists in.
const LanguageContext = createContext<{
  links: TranslationLink[];
  setLinks: Dispatch<SetStateAction<TranslationLink[]>>;
}>({ links: [], setLinks: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<TranslationLink[]>([]);

  return (
    <LanguageContext.Provider value={{ links, setLinks }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function PageLanguages({ links }: { links: TranslationLink[] }) {
  const { setLinks } = useContext(LanguageContext);
  const key = JSON.stringify(links);

  useEffect(() => {
    setLinks(JSON.parse(key));
    return () => setLinks([]);
  }, [key, setLinks]);

  return null;
}

// Links to this page in its other languages; nothing on a page that has none.
// These are plain links: each language has its own <html lang>, so changing
// language loads the page afresh.
export function LanguageSwitcher({
  lang,
  className,
}: {
  lang: string;
  className?: string;
}) {
  const { links } = useContext(LanguageContext);
  if (links.length === 0) return null;

  return (
    <nav
      aria-label={dictionary(lang).language}
      className={cn("flex items-center gap-3", className)}
    >
      {links.map((link) => {
        const locale = LOCALES.find((locale) => locale.id === link.language);
        return (
          <a
            key={link.language}
            href={link.href}
            hrefLang={locale?.htmlLang}
            lang={locale?.htmlLang}
            className="inline-flex items-center gap-1.5 text-sm text-foreground/60 transition-colors hover:text-foreground/80"
          >
            <Globe aria-hidden="true" className="size-4" />
            {locale?.label ?? link.language}
          </a>
        );
      })}
    </nav>
  );
}
