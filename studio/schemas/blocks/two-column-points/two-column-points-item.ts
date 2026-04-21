import { defineField, defineType } from "sanity";

export default defineType({
  name: "two-column-points-item",
  type: "object",
  title: "Column",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Column Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "points",
      type: "array",
      title: "Points",
      description: "Bullet points shown below the description",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare({ title, description }) {
      return {
        title: title || "Untitled Column",
        subtitle: description || "No description",
      };
    },
  },
});
