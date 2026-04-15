import { defineField, defineType } from "sanity";
import { MessageSquare } from "lucide-react";

export default defineType({
  name: "form-contact",
  type: "object",
  title: "Form: Contact",
  description: "A contact form with configurable labels and email notification.",
  icon: MessageSquare,
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
      name: "heading",
      type: "string",
      initialValue: "Talk to our team",
    }),
    defineField({
      name: "description",
      type: "text",
      initialValue: "Fill out the form and we'll get back to you shortly.",
    }),
    defineField({
      name: "firstNameLabel",
      type: "string",
      title: "First Name Label",
      initialValue: "First Name",
    }),
    defineField({
      name: "lastNameLabel",
      type: "string",
      title: "Last Name Label",
      initialValue: "Last Name",
    }),
    defineField({
      name: "workEmailLabel",
      type: "string",
      title: "Work Email Label",
      initialValue: "Work Email",
    }),
    defineField({
      name: "companyLabel",
      type: "string",
      title: "Company Label",
      initialValue: "Company",
    }),
    defineField({
      name: "messageLabel",
      type: "string",
      title: "Message Label",
      initialValue: "How can we help?",
    }),
    defineField({
      name: "consentText",
      type: "block-content",
      title: "Consent Text",
    }),
    defineField({
      name: "buttonText",
      type: "string",
      title: "Button Text",
      initialValue: "Contact Sales",
    }),
    defineField({
      name: "successMessage",
      type: "text",
      title: "Success Message",
      initialValue: "Thank you! We'll be in touch soon.",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Contact Form" };
    },
  },
});
