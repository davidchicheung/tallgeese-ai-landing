// A relative import: type generation reads this file and does not know "@/".
import { DEFAULT_LANGUAGE } from "../../../lib/i18n";

// Documents written before the site had languages carry no language field;
// they are in the default language.
export const languageQuery = `coalesce(language, "${DEFAULT_LANGUAGE}")`;

// The site path of the page or post an internalLink points to. A page in
// another language sits under that language's prefix (/zh-hant/agent).
const prefix = `select(@.internalLink->language != "${DEFAULT_LANGUAGE}" => "/" + @.internalLink->language)`;

export const internalHrefQuery = `select(
      @.internalLink->_type == "post" => "/blog/" + @.internalLink->slug.current,
      @.internalLink->slug.current == "index" => coalesce(${prefix}, "/"),
      defined(@.internalLink->parent) => coalesce(${prefix}, "") + "/" + @.internalLink->parent + "/" + @.internalLink->slug.current,
      coalesce(${prefix}, "") + "/" + @.internalLink->slug.current
    )`;
