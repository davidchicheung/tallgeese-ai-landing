export const navLinkQuery = `
  _key,
  ...,
  "href": select(
    isExternal == "external" => href,
    defined(href) && !defined(internalLink) => href,
    @.internalLink->slug.current == "index" => "/",
    @.internalLink->_type == "post" => "/blog/" + @.internalLink->slug.current,
    defined(@.internalLink->parent) => "/" + @.internalLink->parent + "/" + @.internalLink->slug.current,
    "/" + @.internalLink->slug.current
  )
`;
