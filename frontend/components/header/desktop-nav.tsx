"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAVIGATION_QUERY_RESULT } from "@/sanity.types";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

type NavItem = NonNullable<
  NonNullable<NAVIGATION_QUERY_RESULT[0]["items"]>[number]
>;

export default function DesktopNav({
  navigation,
}: {
  navigation: NAVIGATION_QUERY_RESULT;
}) {
  const items = navigation[0]?.items;

  return (
    <NavigationMenu className="justify-self-center">
      <NavigationMenuList className="gap-1">
        {items?.map((navItem: NavItem) => {
          if (
            navItem.itemType === "dropdown" &&
            "children" in navItem &&
            navItem.children
          ) {
            const dropdownTitle =
              "title" in navItem ? (navItem.title as string) : "";
            return (
              <NavigationMenuItem key={navItem._key}>
                <NavigationMenuTrigger className="bg-transparent text-foreground/60 hover:text-foreground/80 hover:bg-accent rounded-md data-[state=open]:bg-accent/50">
                  {dropdownTitle}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-1 p-3">
                    {navItem.children.map((child) => (
                      <li key={child._key}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={child.href || "#"}
                            target={
                              child.target === "blank" ? "_blank" : undefined
                            }
                            rel={
                              child.target === "blank"
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {child.title}
                            </div>
                            {child.description && (
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
                                {child.description}
                              </p>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          // itemType === "link"
          const link = "link" in navItem ? navItem.link : null;
          if (!link) return null;

          return (
            <NavigationMenuItem key={navItem._key}>
              <NavigationMenuLink asChild>
                <Link
                  href={link.href || "#"}
                  target={link.target ? "_blank" : undefined}
                  rel={link.target ? "noopener noreferrer" : undefined}
                  className={cn(
                    buttonVariants({
                      variant: link.buttonVariant || "default",
                    }),
                    link.buttonVariant === "ghost" &&
                      "transition-colors hover:text-foreground/80 text-foreground/60 text-sm px-4 py-2 h-auto hover:bg-accent rounded-md",
                  )}
                >
                  {link.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
