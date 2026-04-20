import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const tallgeeseInfoQuery = groq`
  _type == "tallgeese-info" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    statements[]{
      _key,
      text,
    },
  }
`;
