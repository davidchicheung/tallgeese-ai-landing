import { defineArrayMember, defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";
import { SECTION_WIDTH } from "./shared/layout-variants";

export default defineType({
  name: "tallgeese-info",
  type: "object",
  title: "TallgeeseAI Info",
  description:
    'An "About TallgeeseAI" section with a stacked list of statements',
  icon: Sparkles,
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
      name: "statements",
      type: "array",
      title: "Statements",
      description: "Short statements rendered as stacked rows",
      validation: (Rule) => Rule.min(1).max(6),
      of: [
        defineArrayMember({
          type: "object",
          name: "tallgeese-statement",
          title: "Statement",
          fields: [
            defineField({
              name: "text",
              type: "text",
              title: "Text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "text" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "TallgeeseAI Info",
        subtitle: "About TallgeeseAI",
      };
    },
  },
});
