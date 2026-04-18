import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const pageCarouselQuery = groq`
  _type == "page-carousel" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    linkLabel,
    parent,
    size,
    indicators,
    imageHoverZoom,
    cardStyle,
  }
`;
