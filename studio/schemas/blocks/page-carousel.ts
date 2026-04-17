import { defineField, defineType } from "sanity";
import { GalleryHorizontal } from "lucide-react";

const PARENT_OPTIONS = [
  { title: "Customers", value: "customers" },
  { title: "Solutions", value: "solutions" },
  { title: "Industries", value: "industries" },
];

const SIZE_OPTIONS = [
  { title: "One", value: "one" },
  { title: "Two", value: "two" },
  { title: "Three", value: "three" },
];

const INDICATOR_OPTIONS = [
  { title: "None", value: "none" },
  { title: "Dots", value: "dots" },
  { title: "Count", value: "count" },
];

export default defineType({
  name: "page-carousel",
  type: "object",
  title: "Page Carousel",
  description:
    "A carousel of sibling pages (same parent), e.g. other customer stories",
  icon: GalleryHorizontal,
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
      description: 'e.g. "Other customer stories"',
    }),
    defineField({
      name: "linkLabel",
      type: "string",
      title: "Card Link Label",
      description:
        'Optional call-to-action text shown at the bottom of each card (e.g. "Read story"). An arrow icon is appended automatically.',
    }),
    defineField({
      name: "parent",
      type: "string",
      title: "Parent",
      description: "Show pages that live under this parent URL segment",
      options: {
        list: PARENT_OPTIONS,
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "size",
      type: "string",
      title: "Slides Per View",
      options: {
        list: SIZE_OPTIONS,
        layout: "radio",
      },
      initialValue: "three",
    }),
    defineField({
      name: "indicators",
      type: "string",
      title: "Indicators",
      options: {
        list: INDICATOR_OPTIONS,
        layout: "radio",
      },
      initialValue: "none",
    }),
    defineField({
      name: "imageHoverZoom",
      type: "string",
      title: "Zoom Image On Hover",
      options: {
        list: [
          { title: "Off", value: "off" },
          { title: "On", value: "on" },
        ],
        layout: "radio",
      },
      initialValue: "off",
    }),
  ],
  preview: {
    select: {
      title: "title",
      parent: "parent",
    },
    prepare({ title, parent }) {
      return {
        title: "Page Carousel",
        subtitle: title || (parent ? `Pages under /${parent}` : undefined),
      };
    },
  },
});
