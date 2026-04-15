import { defineField, defineType } from "sanity";
import { Scale } from "lucide-react";

export default defineType({
  name: "legal",
  type: "object",
  title: "Legal",
  description: "A legal content block for privacy policies, terms of use, etc.",
  icon: Scale,
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
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      type: "date",
      title: "Last Updated",
    }),
    defineField({
      name: "body",
      type: "block-content",
      title: "Body",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Legal",
        subtitle: title,
      };
    },
  },
});
