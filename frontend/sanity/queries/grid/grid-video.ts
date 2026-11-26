import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const gridVideoQuery = groq`
  _type == "grid-video" => {
    _type,
    _key,
    url,
    category,
    title,
    excerpt,
    image{
      ${imageQuery}
    },
  }
`;
