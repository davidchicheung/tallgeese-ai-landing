import { defineField, defineType } from "sanity";
import { Image as ImageIcon } from "lucide-react";
import { SECTION_WIDTH } from "./shared/layout-variants";

export default defineType({
  name: "image-block",
  type: "object",
  title: "Image",
  description: "A standalone image, no title or description",
  icon: ImageIcon,
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
      name: "sectionWidth",
      type: "string",
      title: "Section Width",
      options: {
        list: SECTION_WIDTH.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageDark",
      title: "Image for dark mode",
      description:
        "Optional: shown instead of the image above when the site is in dark mode, e.g. a logo with light lettering",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: "image",
    },
    prepare({ media }) {
      return {
        title: "Image",
        media,
      };
    },
  },
});
