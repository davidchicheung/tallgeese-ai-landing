import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT, POST_QUERY_RESULT } from "@/sanity.types";
import { DEFAULT_LANGUAGE, htmlLang, pagePath, translationLinks } from "@/lib/i18n";
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// A page's own address, and its address in each language it is published in,
// for search engines. Posts have one language and only the first.
function alternates(page: PAGE_QUERY_RESULT | POST_QUERY_RESULT, slug: string) {
  if (!page || !("translations" in page)) {
    return { canonical: siteUrl + `/${slug === "index" ? "" : slug}` };
  }

  const own = pagePath(page);
  const others = translationLinks(page);
  if (others.length === 0) return { canonical: siteUrl + own };

  const all = [{ language: page.language, href: own }, ...others];
  const languages: Record<string, string> = {};
  for (const { language, href } of all) {
    languages[htmlLang(language)] = siteUrl + href;
    if (language === DEFAULT_LANGUAGE) languages["x-default"] = siteUrl + href;
  }

  return { canonical: siteUrl + own, languages };
}

export function generatePageMetadata({
  page,
  slug,
}: {
  page: PAGE_QUERY_RESULT | POST_QUERY_RESULT;
  slug: string;
}) {
  return {
    title: page?.meta?.title,
    description: page?.meta?.description,
    openGraph: {
      images: [
        {
          url: page?.meta?.image
            ? urlFor(page?.meta?.image).quality(100).url()
            : `${siteUrl}/images/og-image.jpg`,
          width: page?.meta?.image?.asset?.metadata?.dimensions?.width || 1200,
          height: page?.meta?.image?.asset?.metadata?.dimensions?.height || 630,
        },
      ],
      // Only the default language's pages are known to be en_US.
      locale:
        page && "language" in page && page.language !== DEFAULT_LANGUAGE
          ? undefined
          : "en_US",
      type: "website",
    },
    robots: !isProduction
      ? "noindex, nofollow"
      : page?.meta?.noindex
        ? "noindex"
        : "index, follow",
    alternates: alternates(page, slug),
  };
}
