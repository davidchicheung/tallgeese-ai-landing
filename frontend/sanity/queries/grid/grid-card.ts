import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";
import { linkQuery } from "../shared/link";

// @sanity-typegen-ignore
export const gridCardQuery = groq`
  _type == "grid-card" => {
    _type,
    _key,
    icon,
    iconColor,
    title,
    excerpt,
    image{
      ${imageQuery}
    },
    hasLink,
    link{
      ${linkQuery}
    },
  }
`;
