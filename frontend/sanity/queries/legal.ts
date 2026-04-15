import { groq } from "next-sanity";
import { bodyQuery } from "./shared/body";

// @sanity-typegen-ignore
export const legalQuery = groq`
  _type == "legal" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    lastUpdated,
    body[]{
      ${bodyQuery}
    },
  }
`;
