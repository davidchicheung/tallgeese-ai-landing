import locales from "./locales.json";

// The languages the site is published in. The first is the default: its pages
// have no prefix (/agent); the others sit under their id (/zh-hant/agent). The
// id is also the value of a document's language field in Sanity, so keep
// locales.json in step with studio/languages.ts.
export const LOCALES = locales;
// The id of the first entry of locales.json. It is written out because Sanity's
// type generation reads the queries that use it and can only follow a literal.
export const DEFAULT_LANGUAGE = "en";

export function isLanguage(value: string): boolean {
  return locales.some((locale) => locale.id === value);
}

export function htmlLang(language: string): string {
  return locales.find((locale) => locale.id === language)?.htmlLang ?? language;
}

// A site path ("/", "/agent") as it is addressed in a language.
export function localePath(language: string, path: string): string {
  if (language === DEFAULT_LANGUAGE) return path;
  return path === "/" ? `/${language}` : `/${language}${path}`;
}

// Where a page lives: its language, then its parent, then its slug.
export function pagePath(page: {
  language: string;
  parent?: string | null;
  slug: string | null;
}): string {
  const path =
    !page.slug || page.slug === "index"
      ? "/"
      : page.parent
        ? `/${page.parent}/${page.slug}`
        : `/${page.slug}`;
  return localePath(page.language, path);
}

export type TranslationLink = { language: string; href: string };

// The other languages a page has been published in, with its address in each.
export function translationLinks(page: {
  language: string;
  translations:
    | { language: string | null; slug: string | null; parent: string | null }[]
    | null;
}): TranslationLink[] {
  return (page.translations ?? []).flatMap((translation) =>
    translation.language &&
    translation.slug &&
    translation.language !== page.language &&
    isLanguage(translation.language)
      ? [
          {
            language: translation.language,
            href: pagePath({
              language: translation.language,
              parent: translation.parent,
              slug: translation.slug,
            }),
          },
        ]
      : [],
  );
}
