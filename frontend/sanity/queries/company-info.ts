import { groq } from "next-sanity";
import { bodyQuery } from "./shared/body";

// @sanity-typegen-ignore
export const companyInfoQuery = groq`
  _type == "company-info" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    title,
    description[]{
      ${bodyQuery}
    },
    stats[]{
      _key,
      value,
      label,
    },
  }
`;
