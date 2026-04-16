import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";
import { bodyQuery } from "./shared/body";

// @sanity-typegen-ignore
export const companyHeroQuery = groq`
  _type == "company-hero" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    companyLogo{
      ${imageQuery}
    },
    tagLine,
    title,
    heroImage{
      ${imageQuery}
    },
    description[]{
      ${bodyQuery}
    },
  }
`;
