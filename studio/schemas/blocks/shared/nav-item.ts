import { defineField, defineType } from "sanity";
import { ChevronDown } from "lucide-react";

export default defineType({
  name: "nav-item",
  type: "object",
  title: "Navigation Item",
  icon: ChevronDown,
  fields: [
    defineField({
      name: "itemType",
      title: "Item Type",
      type: "string",
      options: {
        list: [
          { title: "Link", value: "link" },
          { title: "Dropdown", value: "dropdown" },
        ],
        layout: "radio",
      },
      initialValue: "link",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "iconPicker",
      description: "Optional icon shown before the link text",
      options: {
        storeSvg: true,
      },
      hidden: ({ parent }) => parent?.itemType !== "link",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      hidden: ({ parent }) => parent?.itemType !== "link",
    }),
    defineField({
      name: "title",
      title: "Dropdown Title",
      type: "string",
      hidden: ({ parent }) => parent?.itemType !== "dropdown",
    }),
    defineField({
      name: "children",
      title: "Dropdown Items",
      type: "array",
      of: [{ type: "nav-link" }],
      hidden: ({ parent }) => parent?.itemType !== "dropdown",
    }),
  ],
  preview: {
    select: {
      itemType: "itemType",
      linkTitle: "link.title",
      dropdownTitle: "title",
    },
    prepare({ itemType, linkTitle, dropdownTitle }) {
      return {
        title: itemType === "dropdown" ? dropdownTitle : linkTitle,
        subtitle: itemType === "dropdown" ? "Dropdown" : "Link",
      };
    },
  },
});
