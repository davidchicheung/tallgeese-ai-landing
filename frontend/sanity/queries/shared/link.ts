import { internalHrefQuery } from "./language";

export const linkQuery = `
    _key,
    ...,
    "href": select(
      isExternal => href,
      defined(href) && !defined(internalLink) => href,
      ${internalHrefQuery}
    )
`;
