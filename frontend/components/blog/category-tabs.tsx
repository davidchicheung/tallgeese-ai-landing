import Link from "next/link";
import { stegaClean } from "next-sanity";
import { cn } from "@/lib/utils";
import { CATEGORIES_QUERY_RESULT } from "@/sanity.types";

interface CategoryTabsProps {
  categories: CATEGORIES_QUERY_RESULT;
  activeSlug?: string;
}

export default function CategoryTabs({
  categories,
  activeSlug,
}: CategoryTabsProps) {
  const tabs: { label: string; slug: string | null }[] = [
    { label: "All", slug: null },
    ...categories
      .filter((c) => c.slug)
      .map((c) => ({
        label: stegaClean(c.title ?? ""),
        slug: stegaClean(c.slug as string),
      })),
  ];

  return (
    <nav
      className="flex flex-wrap items-center gap-2 mb-10"
      aria-label="Filter posts by category"
    >
      {tabs.map((tab) => {
        const isActive = (tab.slug ?? null) === (activeSlug ?? null);
        const href = tab.slug ? `/blog?category=${tab.slug}` : "/blog";
        return (
          <Link
            key={tab.slug ?? "all"}
            href={href}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:border-primary",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
