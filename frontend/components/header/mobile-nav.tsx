"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { useState } from "react";
import { AlignRight } from "lucide-react";
import { SETTINGS_QUERY_RESULT, NAVIGATION_QUERY_RESULT } from "@/sanity.types";

type NavItem = NonNullable<
  NonNullable<NAVIGATION_QUERY_RESULT[0]["items"]>[number]
>;

export default function MobileNav({
  navigation,
  settings,
}: {
  navigation: NAVIGATION_QUERY_RESULT;
  settings: SETTINGS_QUERY_RESULT;
}) {
  const [open, setOpen] = useState(false);
  const items = navigation[0]?.items;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <AlignRight className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mx-auto">
            <Logo settings={settings} />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container">
            <div className="space-y-3">
              {items?.map((navItem: NavItem) => {
                if (
                  navItem.itemType === "dropdown" &&
                  "children" in navItem &&
                  navItem.children
                ) {
                  const dropdownTitle =
                    "title" in navItem ? (navItem.title as string) : "";
                  return (
                    <Accordion
                      key={navItem._key}
                      type="single"
                      collapsible
                    >
                      <AccordionItem value={navItem._key} className="border-b-0">
                        <AccordionTrigger className="justify-center gap-2 py-2 text-lg font-medium hover:no-underline [&>svg]:ml-0">
                          {dropdownTitle}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-none space-y-2 pt-1">
                            {navItem.children.map((child) => (
                              <li key={child._key} className="text-center">
                                <Link
                                  onClick={() => setOpen(false)}
                                  href={child.href || "#"}
                                  target={
                                    child.target === "blank"
                                      ? "_blank"
                                      : undefined
                                  }
                                  rel={
                                    child.target === "blank"
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  className="inline-block text-muted-foreground hover:text-foreground transition-colors py-1"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }

                // itemType === "link"
                const link = "link" in navItem ? navItem.link : null;
                if (!link) return null;

                return (
                  <div key={navItem._key} className="text-center">
                    <Link
                      onClick={() => setOpen(false)}
                      href={link.href || "#"}
                      target={link.target ? "_blank" : undefined}
                      rel={link.target ? "noopener noreferrer" : undefined}
                      className={cn(
                        buttonVariants({
                          variant: link.buttonVariant || "default",
                        }),
                        link.buttonVariant === "ghost" &&
                          "hover:text-decoration-none hover:opacity-50 text-lg p-0 h-auto hover:bg-transparent",
                      )}
                    >
                      {link.title}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="pt-6 text-center">
              <Link
                onClick={() => setOpen(false)}
                href="/contact"
                className={cn(buttonVariants({ variant: "default" }), "w-full")}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
