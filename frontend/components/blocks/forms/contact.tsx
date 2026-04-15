"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SectionContainer from "@/components/ui/section-container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useCallback } from "react";
import { Loader2, Mail } from "lucide-react";
import { stegaClean } from "next-sanity";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import HeroSceneLoader from "@/components/3d/hero-scene-loader";

type FormContactProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "form-contact" }
>;

const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  workEmail: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  company: z.string().min(1, { message: "Company is required" }),
  message: z.string().min(1, { message: "Please tell us about your goals" }).max(1000, { message: "Message must be 1000 characters or less" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function FormContact({
  padding,
  colorVariant,
  heading,
  description,
  firstNameLabel,
  lastNameLabel,
  workEmailLabel,
  companyLabel,
  messageLabel,
  consentText,
  buttonText,
  successMessage,
}: FormContactProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      workEmail: "",
      company: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSend = useCallback(
    async (values: ContactFormValues) => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const result = await response.json();

        if (response.ok) {
          toast(successMessage);
          form.reset();
        } else {
          toast.error(result.error);
        }
      } catch (error: any) {
        toast.error(error.message);
        throw new Error(error.message);
      }
    },
    [form, successMessage],
  );

  async function onSubmit(values: ContactFormValues) {
    await handleSend(values);
  }

  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <HeroSceneLoader />
      <div className="mx-auto max-w-xl">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-lg text-muted-foreground mb-8 text-center">
            {description}
          </p>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{firstNameLabel || "First Name"}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="given-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{lastNameLabel || "Last Name"}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="family-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="workEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{workEmailLabel || "Work Email"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{companyLabel || "Company"}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="organization" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <FormControl>
                      <Textarea {...field} rows={12} maxLength={1000} placeholder={messageLabel || "How can we help?"} />
                    </FormControl>
                    <div className="flex justify-between">
                      <FormMessage />
                      <p className="text-sm text-muted-foreground ml-auto">
                        {field.value?.length || 0}/1000
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4 pb-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="cursor-pointer"
              >
                {isSubmitting && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {buttonText || "Contact Sales"} <Mail className="w-4 h-4 ml-1" />
              </Button>
              </div>

              {consentText && (
                <div className="text-sm text-muted-foreground text-center">
                  <PortableTextRenderer value={consentText} />
                </div>
              )}
          </form>
        </Form>
      </div>
    </SectionContainer>
  );
}
