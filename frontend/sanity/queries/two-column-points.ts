import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const twoColumnPointsQuery = groq`
  _type == "two-column-points" => {
    _type,
    _key,
    padding,
    colorVariant,
    columns[]{
      _key,
      title,
      description,
      points,
    },
  }
`;
