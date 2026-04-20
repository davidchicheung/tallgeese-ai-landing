import { groq } from "next-sanity";

export const CATEGORIES_QUERY = groq`*[_type == "category" && defined(slug)] | order(orderRank){
  title,
  "slug": slug.current
}`;
