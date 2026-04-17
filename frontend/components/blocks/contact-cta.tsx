import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/ui/section-container";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type ContactCtaProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "contact-cta" }
>;

export default function ContactCta({
  padding,
  colorVariant,
  tagLine,
  title,
  body,
  links,
}: ContactCtaProps) {
  const isPrimary = colorVariant === "primary";

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div className="max-w-[48rem] mx-auto text-center">
        <div className={cn(isPrimary ? "text-background" : undefined)}>
          {tagLine && (
            <h1 className="leading-[0] mb-4">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          {title && <h2 className="text-3xl md:text-5xl mb-4">{title}</h2>}
          {body && (
            <div
              className={cn(
                "text-muted-foreground [&_strong]:text-foreground",
                isPrimary
                  ? "text-background/80 [&_strong]:text-background"
                  : undefined,
              )}
            >
              <PortableTextRenderer value={body} />
            </div>
          )}
        </div>
        {links && links.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {links.map((link) => (
              <Button key={link.title} variant={link?.buttonVariant} asChild>
                <Link
                  href={link.href || "#"}
                  target={link.target ? "_blank" : undefined}
                  rel={link.target ? "noopener" : undefined}
                >
                  {link.title}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
