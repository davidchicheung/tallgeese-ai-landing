import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";
import { bodyQuery } from "./shared/body";
import { metaQuery } from "./shared/meta";

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    image{
      ${imageQuery}
    },
    body[]{
      ${bodyQuery}
    },
    author->{
      name,
      image {
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    },
    publishedAt,
    categories[]->{
      title,
      "slug": slug.current
    },
    _createdAt,
    _updatedAt,
    ${metaQuery},
}`;

const postListProjection = `
    title,
    slug,
    publishedAt,
    image{
      ${imageQuery}
    },
    categories[]->{
      title,
      "slug": slug.current
    }
`;

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)] | order(coalesce(publishedAt, _createdAt) desc){
    ${postListProjection}
}`;

export const POSTS_SLUGS_QUERY = groq`*[_type == "post" && defined(slug)]{slug}`;

export const BLOG_POSTS_QUERY = groq`*[
    _type == "post"
    && defined(slug)
    && ($category == null || $category in categories[]->slug.current)
    && ($excludeSlug == null || slug.current != $excludeSlug)
  ] | order(coalesce(publishedAt, _createdAt) desc) [$start...$end]{
    ${postListProjection}
}`;

export const BLOG_POSTS_COUNT_QUERY = groq`count(*[
    _type == "post"
    && defined(slug)
    && ($category == null || $category in categories[]->slug.current)
    && ($excludeSlug == null || slug.current != $excludeSlug)
  ])`;

export const FEATURED_POST_QUERY = groq`*[_type == "settings"][0].featuredPost->{
    ${postListProjection}
}`;
