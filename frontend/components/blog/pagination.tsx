import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
}

function buildHref({
  page,
  category,
}: {
  page: number;
  category?: string;
}): string {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export default function Pagination({
  currentPage,
  totalPages,
  category,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-12"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <Link
          href={buildHref({ page: currentPage - 1, category })}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </Link>
      )}

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <Link
            key={page}
            href={buildHref({ page, category })}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full border text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-primary",
            )}
            aria-label={`Page ${page}`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={buildHref({ page: currentPage + 1, category })}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </Link>
      )}
    </nav>
  );
}
