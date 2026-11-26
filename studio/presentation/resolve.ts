import {
  defineLocations,
  defineDocuments,
  PresentationPluginOptions,
} from "sanity/presentation";
import { DEFAULT_LANGUAGE, LANGUAGES } from "../languages";

// A page is at /<slug> in the default language and /<language>/<slug> in others.
const pageDocuments = LANGUAGES.flatMap(({ id }) => {
  const prefix = id === DEFAULT_LANGUAGE ? "" : `/${id}`;
  const inLanguage = `coalesce(language, "${DEFAULT_LANGUAGE}") == "${id}"`;
  return [
    {
      route: prefix || "/",
      filter: `_type == 'page' && slug.current == 'index' && ${inLanguage}`,
    },
    {
      route: `${prefix}/:slug`,
      filter: `_type == 'page' && slug.current == $slug && ${inLanguage}`,
    },
  ];
});

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/blog/${doc?.slug}`,
          },
          { title: "Blog", href: `/blog` },
        ],
      }),
    }),
  },
  mainDocuments: defineDocuments([
    ...pageDocuments,
    {
      route: "/blog/:slug",
      filter: `_type == 'post' && slug.current == $slug`,
    },
  ]),
};
