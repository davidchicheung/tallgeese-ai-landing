import { defineField, defineType } from "sanity";
import { LayoutGrid } from "lucide-react";

export default defineType({
  name: "grid-card",
  type: "object",
  icon: LayoutGrid,
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "iconPicker",
      options: {
        storeSvg: true,
      },
    }),
    defineField({
      name: "iconColor",
      title: "Icon Color",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Indigo", value: "indigo" },
          { title: "Purple", value: "purple" },
          { title: "Green", value: "green" },
          { title: "Red", value: "red" },
          { title: "Orange", value: "orange" },
          { title: "Teal", value: "teal" },
          { title: "Pink", value: "pink" },
        ],
        layout: "radio",
      },
      initialValue: "blue",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      type: "text",
    }),
    defineField({
      name: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "hasLink",
      title: "Include Link",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "link",
      type: "link",
      hidden: ({ parent }) => !parent?.hasLink,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: "Grid Card",
        subtitle: title || "No title",
        media,
      };
    },
  },
});
