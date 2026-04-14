import { defineField, defineType } from "sanity";
import { Layers } from "lucide-react";

export default defineType({
  name: "feature-cards",
  type: "object",
  title: "Feature Cards",
  description: "Grid section showcasing feature cards",
  icon: Layers,
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
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "cards",
      type: "array",
      title: "Cards",
      of: [{ type: "feature-card-item" }],
      validation: (rule) => rule.min(2).max(8),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Feature Cards",
        subtitle: title || "No title",
      };
    },
  },
});
