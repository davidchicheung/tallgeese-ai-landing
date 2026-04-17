import { defineField, defineType } from "sanity";
import { PhoneCall } from "lucide-react";

export default defineType({
  name: "contact-cta",
  title: "Contact CTA",
  type: "object",
  description:
    "A centered call-to-action with the hero 3D scene above the headline",
  icon: PhoneCall,
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
      name: "tagLine",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Contact CTA",
        subtitle: title,
      };
    },
  },
});
