// The languages the site is published in. The id is also the URL prefix on the
// site (/zh-hant/agent), so keep this list in step with frontend/lib/locales.json.
export const LANGUAGES = [
  { id: "en", title: "English" },
  { id: "zh-hant", title: "繁體中文" },
];

export const DEFAULT_LANGUAGE = "en";

// Types whose documents exist once per language, linked by the Translations menu.
export const TRANSLATED_TYPES = ["page", "faq"];

// Existing documents were written before languages and carry no language field.
export const IN_LANGUAGE = `coalesce(language, "${DEFAULT_LANGUAGE}") == $language`;
