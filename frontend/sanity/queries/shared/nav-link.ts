import { internalHrefQuery } from "./language";

export const navLinkQuery = `
  _key,
  ...,
  "href": select(
    isExternal == "external" => href,
    defined(href) && !defined(internalLink) => href,
    ${internalHrefQuery}
  )
`;
