import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import SectionContainer from "@/components/ui/section-container";

import { PAGE_QUERY_RESULT } from "@/sanity.types";

type CompanyInfoProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "company-info" }
>;

export default function CompanyInfo({
  padding,
  colorVariant,
  sectionWidth = "default",
  title,
  description,
  stats,
}: CompanyInfoProps) {
  const isNarrow = sectionWidth === "narrow";
  const isPrimary = colorVariant === "primary";

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div
        className={cn(
          "mx-auto",
          isNarrow ? "max-w-[48rem]" : "max-w-[64rem]",
        )}
      >
        <div className="divide-y divide-border">
          {(title || (description && description.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-8 first:pt-0">
              {title && (
                <h2
                  className={cn(
                    "text-[32px] leading-tight",
                    isPrimary ? "text-background" : undefined,
                  )}
                >
                  {title}
                </h2>
              )}
              {description && description.length > 0 && (
                <div
                  className={cn(
                    "text-muted-foreground [&_strong]:text-foreground [&_h1]:text-muted-foreground [&_h2]:text-muted-foreground [&_h3]:text-muted-foreground [&_h4]:text-muted-foreground",
                    isPrimary
                      ? "text-background/80 [&_strong]:text-background [&_h1]:text-background/80 [&_h2]:text-background/80 [&_h3]:text-background/80 [&_h4]:text-background/80"
                      : undefined,
                  )}
                >
                  <PortableTextRenderer value={description} />
                </div>
              )}
            </div>
          )}
          {stats?.map((stat) => (
            <div
              key={stat._key}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-8 items-baseline"
            >
              <div
                className={cn(
                  "text-[40px] leading-tight font-bold",
                  isPrimary ? "text-background" : "text-foreground",
                )}
              >
                {stat.value}
              </div>
              <p
                className={cn(
                  "text-[24px] leading-snug text-white",
                  isPrimary ? "text-background" : undefined,
                )}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
