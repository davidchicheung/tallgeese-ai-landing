import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";
import { navLinkQuery } from "./shared/nav-link";

export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"]{
    _type,
    _key,
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
