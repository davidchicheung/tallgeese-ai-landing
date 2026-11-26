import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";
import { navLinkQuery } from "./shared/nav-link";
import { languageQuery } from "./shared/language";

export const NAVIGATION_QUERY = groq`
  *[_type == "navigation" && ${languageQuery} in $languages]{
    _type,
    _key,
    "language": ${languageQuery},
    items[]{
      _key,
      itemType,
      itemType == "link" => {
        icon,
        link{
          ${linkQuery}
        }
      },
      itemType == "dropdown" => {
        title,
        children[]{
          ${navLinkQuery}
        }
      }
    }
  }
`;
