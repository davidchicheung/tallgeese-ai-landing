import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "blog-carousel",
  type: "object",
  title: "Blog Carousel",
  icon: Newspaper,
  description: "A carousel of the latest blog posts",
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
      description: "Optional heading shown above the carousel",
    }),
    defineField({
      name: "linkLabel",
      type: "string",
      title: "Link Label",
      description: "Optional 'view all' style link text shown next to the title",
    }),
    defineField({
      name: "indicators",
      type: "string",
      title: "Slide Indicators",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Dots", value: "dots" },
          { title: "Count", value: "count" },
        ],
        layout: "radio",
      },
      initialValue: "dots",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Blog Carousel",
        subtitle: title || "Latest posts, 2 at a time",
      };
    },
  },
});
