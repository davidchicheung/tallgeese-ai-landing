import { defineField, defineType } from "sanity";
import { Link } from "lucide-react";

export default defineType({
  name: "nav-link",
  type: "object",
  title: "Navigation Link",
  icon: Link,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().error("A title is required"),
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
      description: "Optional description shown below the title in dropdowns",
    }),
    defineField({
      name: "isExternal",
      type: "string",
      title: "Link Type",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    }),
    defineField({
      name: "internalLink",
      type: "reference",
      title: "Internal Link",
      to: [{ type: "page" }, { type: "post" }],
      hidden: ({ parent }) => parent?.isExternal === "external",
    }),
    defineField({
      name: "href",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.isExternal !== "external",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "target",
      type: "string",
      title: "Open in new tab",
      options: {
        list: [
          { title: "Same tab", value: "self" },
          { title: "New tab", value: "blank" },
        ],
        layout: "radio",
      },
      initialValue: "self",
      hidden: ({ parent }) => parent?.isExternal !== "external",
    }),
  ],
  preview: {
    select: { title: "title", description: "description" },
    prepare({ title, description }) {
      return { title, subtitle: description };
    },
  },
});
