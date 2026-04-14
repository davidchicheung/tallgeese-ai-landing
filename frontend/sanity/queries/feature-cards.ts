import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

// @sanity-typegen-ignore
export const featureCardsQuery = groq`
  _type == "feature-cards" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    description,
    cards[]{
      _key,
      title,
      icon,
      description,
      features,
      image{
        ${imageQuery}
      },
    },
  }
`;
