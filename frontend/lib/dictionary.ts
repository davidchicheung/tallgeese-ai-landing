import { DEFAULT_LANGUAGE } from "./i18n";

// Text that lives in the code instead of Sanity, per language.
const en = {
  homePage: "Home page",
  contactUs: "Contact Us",
  openMenu: "Open Menu",
  mainNavigation: "Main Navigation",
  navigationDescription: "Navigate to the website pages",
  language: "Language",
  // The footer puts the legal links under the menu with this title.
  legalColumn: "Company",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  license: "License Agreement",
  watchWalkthrough: "Watch the walkthrough",
  watchOnYouTube: (title: string) =>
    `Watch "${title}" on YouTube, opens in a new tab`,
};

const dictionaries: Record<string, typeof en> = {
  en,
  "zh-hant": {
    homePage: "首頁",
    contactUs: "聯絡我們",
    openMenu: "開啟選單",
    mainNavigation: "主選單",
    navigationDescription: "瀏覽網站頁面",
    language: "語言",
    legalColumn: "公司",
    privacy: "隱私權政策",
    terms: "使用條款",
    license: "授權協議",
    watchWalkthrough: "觀看示範影片",
    watchOnYouTube: (title: string) =>
      `在 YouTube 觀看「${title}」，將於新分頁開啟`,
  },
};

export function dictionary(language: string = DEFAULT_LANGUAGE) {
  return dictionaries[language] ?? en;
}
