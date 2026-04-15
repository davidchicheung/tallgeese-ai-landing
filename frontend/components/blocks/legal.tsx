import SectionContainer from "@/components/ui/section-container";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type LegalProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "legal" }
>;

export default function Legal({
  padding,
  colorVariant,
  title,
  lastUpdated,
  body,
}: LegalProps) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div className="max-w-3xl mx-auto">
        {title && <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>}
        {lastUpdated && (
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated:{" "}
            {new Date(lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        {body && (
          <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
            <PortableTextRenderer value={body} />
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
