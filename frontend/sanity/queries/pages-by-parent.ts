import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

export const PAGES_BY_PARENT_QUERY = groq`
  *[_type == "page" && parent == $parent && slug.current != $excludeSlug]
    | order(orderRank){
      _id,
      title,
      "slug": slug.current,
      parent,
      meta{
        description,
        image{
          ${imageQuery}
        }
      }
    }
`;
