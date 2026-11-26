import { defineField, defineType, type SlugIsUniqueValidator } from "sanity";
import { Files } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import meta from "../blocks/shared/meta";
import { DEFAULT_LANGUAGE } from "../../languages";

// A page's address is its language, parent and slug together, so the Chinese
// /zh-hant/agent may share the slug of the English /agent.
const isUniqueAddress: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context;
  const id = document?._id.replace(/^drafts\./, "");
  return getClient({ apiVersion: "2024-10-01" }).fetch(
    `!defined(*[
      _type == "page" && slug.current == $slug
      && coalesce(parent, "") == $parent
      && coalesce(language, $defaultLanguage) == $language
      && !(_id in [$id, "drafts." + $id])
    ][0]._id)`,
    {
      slug,
      id,
      parent: document?.parent ?? "",
      language: document?.language ?? DEFAULT_LANGUAGE,
      defaultLanguage: DEFAULT_LANGUAGE,
    },
  );
};

export default defineType({
  name: "page",
  type: "document",
  title: "Page",
  icon: Files,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content" }),
    defineField({
      name: "parent",
      title: "Parent",
      type: "string",
      group: "settings",
      description:
        "Optional URL prefix. Leave empty for top-level pages (e.g. /about). Set to group under a category (e.g. 'customers' renders at /customers/slug).",
      options: {
        list: [
          { title: "Customers", value: "customers" },
          { title: "Solutions", value: "solutions" },
          { title: "Industries", value: "industries" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: isUniqueAddress,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blocks",
      type: "array",
      group: "content",
      of: [
        { type: "hero-1" },
        { type: "hero-2" },
        { type: "section-header" },
        { type: "company-hero" },
        { type: "company-info" },
        { type: "tallgeese-info" },
        { type: "split-row" },
        { type: "grid-row" },
        { type: "carousel-1" },
        { type: "carousel-2" },
        { type: "blog-carousel" },
        { type: "page-carousel" },
        { type: "timeline-row" },
        { type: "cta-1" },
        { type: "logo-cloud-1" },
        { type: "faqs" },
        { type: "form-newsletter" },
        { type: "form-contact" },
        { type: "all-posts" },
        { type: "feature-cards" },
        { type: "two-column-points" },
        { type: "legal" },
        { type: "image-block" },
      ],
      options: {
        insertMenu: {
          groups: [
            {
              name: "hero",
              title: "Hero",
              of: ["hero-1", "hero-2"],
            },
            {
              name: "company",
              title: "Company",
              of: ["company-hero", "company-info", "tallgeese-info"],
            },
            {
              name: "logo-cloud",
              title: "Logo Cloud",
              of: ["logo-cloud-1"],
            },
            {
              name: "section-header",
              title: "Section Header",
              of: ["section-header"],
            },
            {
              name: "grid",
              title: "Grid",
              of: ["grid-row"],
            },
            {
              name: "split",
              title: "Split",
              of: ["split-row"],
            },
            {
              name: "carousel",
              title: "Carousel",
              of: ["carousel-1", "carousel-2", "blog-carousel", "page-carousel"],
            },
            {
              name: "timeline",
              title: "Timeline",
              of: ["timeline-row"],
            },
            {
              name: "cta",
              title: "CTA",
              of: ["cta-1"],
            },
            {
              name: "faqs",
              title: "FAQs",
              of: ["faqs"],
            },
            {
              name: "forms",
              title: "Forms",
              of: ["form-newsletter", "form-contact"],
            },
            {
              name: "all-posts",
              title: "All Posts",
              of: ["all-posts"],
            },
            {
              name: "feature-cards",
              title: "Feature Cards",
              of: ["feature-cards"],
            },
            {
              name: "two-column-points",
              title: "Two Column Points",
              of: ["two-column-points"],
            },
            {
              name: "legal",
              title: "Legal",
              of: ["legal"],
            },
            {
              name: "image",
              title: "Image",
              of: ["image-block"],
            },
          ],
          views: [
            {
              name: "grid",
              previewImageUrl: (block) => `/static/images/preview/${block}.jpg`,
            },
            { name: "list" },
          ],
        },
      },
    }),
    meta,
    orderRankField({ type: "page" }),
    // Written by the Translations menu.
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      parent: "parent",
      slug: "slug.current",
      language: "language",
    },
    prepare({ title, parent, slug, language }) {
      const prefix =
        language && language !== DEFAULT_LANGUAGE ? `/${language}` : "";
      const path =
        prefix + (parent ? `/${parent}/${slug ?? ""}` : `/${slug ?? ""}`);
      return {
        title: title ?? "(untitled)",
        subtitle: path,
      };
    },
  },
});
