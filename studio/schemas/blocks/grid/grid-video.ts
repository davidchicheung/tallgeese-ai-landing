import { defineField, defineType } from "sanity";
import { CirclePlay } from "lucide-react";

export default defineType({
  name: "grid-video",
  type: "object",
  title: "Video Card",
  description: "A card that plays a YouTube video on the page",
  icon: CirclePlay,
  fields: [
    defineField({
      name: "url",
      title: "YouTube link",
      type: "url",
      description: "The video's link, e.g. https://youtu.be/…",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["https"] }).custom((url) =>
          !url || /^https:\/\/(www\.)?(youtu\.be|youtube\.com)\//.test(url)
            ? true
            : "This must be a YouTube link",
        ),
    }),
    defineField({
      name: "category",
      type: "string",
      description: "Optional small label above the title",
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
      title: "Thumbnail",
      description:
        "Optional: without one, the card shows the video's own thumbnail from YouTube, which is less sharp",
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
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: "Video Card",
        subtitle: title || "No title",
        media,
      };
    },
  },
});
