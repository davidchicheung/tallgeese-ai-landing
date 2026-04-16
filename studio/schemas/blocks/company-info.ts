import { defineArrayMember, defineField, defineType } from "sanity";
import { BadgeInfo } from "lucide-react";
import { SECTION_WIDTH } from "./shared/layout-variants";

export default defineType({
  name: "company-info",
  type: "object",
  title: "Company Info",
  description:
    'An "About [Company]" section with a description and a row of large-number stats',
  icon: BadgeInfo,
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
      name: "title",
      type: "string",
      description: 'e.g. "About Springshot"',
    }),
    defineField({
      name: "description",
      type: "block-content",
    }),
    defineField({
      name: "stats",
      type: "array",
      title: "Stats",
      description: "Large-number stats with supporting labels",
      validation: (Rule) => Rule.min(1).max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "company-stat",
          title: "Stat",
          fields: [
            defineField({
              name: "value",
              type: "string",
              title: "Value",
              description: 'e.g. "300+" or "40%"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              type: "text",
              title: "Label",
              rows: 2,
              description:
                'e.g. "airports supported across six continents"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Company Info",
        subtitle: title,
      };
    },
  },
});
