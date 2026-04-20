import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";

import { PAGE_QUERY_RESULT } from "@/sanity.types";

type TallgeeseInfoProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "tallgeese-info" }
>;

export default function TallgeeseInfo({
  padding,
  colorVariant,
  sectionWidth = "default",
  statements,
}: TallgeeseInfoProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-12">
          <div className="md:col-span-3">
            <p className="leading-tight">
              <span
                className={cn(
                  "text-muted-foreground",
                  isPrimary && "text-background/60",
                )}
              >
                About{" "}
              </span>
              <span
                className={cn(
                  "font-bold text-white",
                  isPrimary && "text-background",
                )}
              >
                TallgeeseAI
              </span>
            </p>
          </div>
          <div className="md:col-span-7 divide-y divide-border">
            {statements?.map((statement) => (
              <p
                key={statement._key}
                className={cn(
                  "text-[20px] leading-normal text-foreground whitespace-pre-line py-8 first:pt-0 last:pb-0",
                  isPrimary && "text-background",
                )}
              >
                {statement.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
