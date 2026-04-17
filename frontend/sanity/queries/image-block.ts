import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

// @sanity-typegen-ignore
export const imageBlockQuery = groq`
  _type == "image-block" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    image{
      ${imageQuery}
    },
  }
`;
