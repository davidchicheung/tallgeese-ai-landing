import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { DEFAULT_LANGUAGE } from "@/lib/i18n";

const VIEWABLE_TYPES = ["page", "post"] as const;

// A page in another language sits under that language's prefix.
const urlQuery = `
  'url': select(
    _type == "page" && language != $defaultLanguage && slug.current == "index" => $baseUrl + "/" + language,
    _type == "page" && language != $defaultLanguage && defined(parent) => $baseUrl + "/" + language + "/" + parent + "/" + slug.current,
    _type == "page" && language != $defaultLanguage => $baseUrl + "/" + language + "/" + slug.current,
    slug.current == "index" => $baseUrl + "/",
    _type == "post-index" => $baseUrl + "/blog",
    _type == "post" => $baseUrl + "/blog/" + slug.current,
    _type == "contact" => $baseUrl + "/contact",
    _type == "page" && defined(parent) => $baseUrl + "/" + parent + "/" + slug.current,
    $baseUrl + "/" + slug.current
  )
`;

/** A single query that fetches all documents with a viewable url/page */
const SITEMAP_QUERY = groq`
  *[
    _type in $viewableTypes
    && meta.noindex != true
    && (defined(slug) || _type in ["contact", "post-index"])
  ] {
    ${urlQuery},
    "lastModified": _updatedAt,
    "changeFrequency": select(_type == "page" => "daily", "weekly"),
    "priority": select(
      _type == "page" && slug.current == "index" => 1,
      _type == "page" => 0.5,
      0.7
    )
  } | order(priority desc, url asc)
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch({
    query: SITEMAP_QUERY,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL!,
      viewableTypes: [...VIEWABLE_TYPES],
      defaultLanguage: DEFAULT_LANGUAGE,
    },
  });

  return data || [];
}
