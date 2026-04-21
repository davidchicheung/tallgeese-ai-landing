import { defineField, defineType } from "sanity";
import { Columns2 } from "lucide-react";

export default defineType({
  name: "two-column-points",
  type: "object",
  title: "Two Column Points",
  description:
    "Two-column section. Each column has a title, description, and bullet points (e.g. Challenge / Solution).",
  icon: Columns2,
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
      name: "columns",
      type: "array",
      title: "Columns",
      of: [{ type: "two-column-points-item" }],
      validation: (Rule) => Rule.length(2).error("Must have exactly 2 columns"),
    }),
  ],
  preview: {
    select: {
      left: "columns.0.title",
      right: "columns.1.title",
    },
    prepare({ left, right }) {
      const subtitle = [left, right].filter(Boolean).join(" / ") || "No columns";
      return {
        title: "Two Column Points",
        subtitle,
      };
    },
  },
});
