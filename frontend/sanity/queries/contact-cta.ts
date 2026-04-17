import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";
import { bodyQuery } from "./shared/body";

// @sanity-typegen-ignore
export const contactCtaQuery = groq`
  _type == "contact-cta" => {
    _type,
    _key,
    padding,
    colorVariant,
    tagLine,
    title,
    body[]{
      ${bodyQuery}
    },
    links[]{
      ${linkQuery}
    },
  }
`;
