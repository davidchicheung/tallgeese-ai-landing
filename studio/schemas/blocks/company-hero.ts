import { defineField, defineType } from "sanity";
import { Building2 } from "lucide-react";
import { SECTION_WIDTH } from "./shared/layout-variants";

export default defineType({
  name: "company-hero",
  type: "object",
  title: "Company Hero",
  description:
    "A centered section header with a company logo before the title and a hero image before the description",
  icon: Building2,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "sectionWidth",
      type: "string",
      title: "Section Width",
      options: {
        list: SECTION_WIDTH.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      description: "Displayed above the title",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineField({
      name: "tagLine",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Displayed between the title and the description",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineField({
      name: "description",
      type: "block-content",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "companyLogo",
    },
    prepare({ title, media }) {
      return {
        title: "Company Hero",
        subtitle: title,
        media,
      };
    },
  },
});
