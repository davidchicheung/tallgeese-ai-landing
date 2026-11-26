import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  Files,
  BookA,
  User,
  ListCollapse,
  Quote,
  Menu,
  Settings,
} from "lucide-react";
import { DEFAULT_LANGUAGE, IN_LANGUAGE, LANGUAGES } from "./languages";

// "Pages" for the default language, "Pages · 繁體中文" for the others.
const titleIn = (title: string, language: (typeof LANGUAGES)[number]) =>
  language.id === DEFAULT_LANGUAGE ? title : `${title} · ${language.title}`;

export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      ...LANGUAGES.map((language) =>
        orderableDocumentListDeskItem({
          type: "page",
          id: `orderable-page-${language.id}`,
          title: titleIn("Pages", language),
          icon: Files,
          filter: IN_LANGUAGE,
          params: { language: language.id },
          S,
          context,
        }),
      ),
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Post")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }]) // Default ordering
        ),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categories",
        icon: BookA,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "author",
        title: "Authors",
        icon: User,
        S,
        context,
      }),
      ...LANGUAGES.map((language) =>
        orderableDocumentListDeskItem({
          type: "faq",
          id: `orderable-faq-${language.id}`,
          title: titleIn("FAQs", language),
          icon: ListCollapse,
          filter: IN_LANGUAGE,
          params: { language: language.id },
          S,
          context,
        }),
      ),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Testimonials",
        icon: Quote,
        S,
        context,
      }),
      S.divider({ title: "Global" }),
      // The default language's menu is the document "navigation"; the others
      // are "navigation-<language>". A language without one uses the default.
      ...LANGUAGES.map((language) => {
        const id =
          language.id === DEFAULT_LANGUAGE
            ? "navigation"
            : `navigation-${language.id}`;
        return S.listItem()
          .id(id)
          .title(titleIn("Navigation", language))
          .icon(Menu)
          .child(S.editor().id(id).schemaType("navigation").documentId(id));
      }),
      S.listItem()
        .title("Settings")
        .icon(Settings)
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("settings")
        ),
    ]);
