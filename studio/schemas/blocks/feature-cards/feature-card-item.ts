import { defineField, defineType } from "sanity";

export default defineType({
  name: "feature-card-item",
  type: "object",
  title: "Feature Card Item",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "iconPicker",
      options: {
        storeSvg: true,
      },
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Features",
      description: "List of feature bullet points",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled Card",
        media,
      };
    },
  },
});
