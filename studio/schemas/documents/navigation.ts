import { defineField, defineType } from "sanity";
import { Menu } from "lucide-react";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: Menu,
  fields: [
    defineField({
      name: "items",
      title: "Navigation Items",
      type: "array",
      of: [{ type: "nav-item" }],
    }),
    // There is one navigation document per language; see structure.ts.
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: { language: "language" },
    prepare({ language }) {
      return { title: "Navigation", subtitle: language };
    },
  },
});
