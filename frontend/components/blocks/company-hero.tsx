import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import PortableTextRenderer from "@/components/portable-text-renderer";
import SectionContainer from "@/components/ui/section-container";

import { PAGE_QUERY_RESULT } from "@/sanity.types";

type CompanyHeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "company-hero" }
>;

export default function CompanyHero({
  padding,
  colorVariant,
  sectionWidth = "default",
  companyLogo,
  tagLine,
  title,
  heroImage,
  description,
}: CompanyHeroProps) {
  const isNarrow = sectionWidth === "narrow";

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div
        className={cn(
          "text-center mx-auto px-6 md:px-10",
          isNarrow ? "max-w-[48rem]" : "max-w-[64rem]",
        )}
      >
        <div
          className={cn(
            colorVariant === "primary" ? "text-background" : undefined,
          )}
        >
          {companyLogo && companyLogo.asset?._id && (
            <div className="mb-8 flex justify-center">
              <Image
                src={urlFor(companyLogo).url()}
                alt={companyLogo.alt || ""}
                width={companyLogo.asset?.metadata?.dimensions?.width || 240}
                height={companyLogo.asset?.metadata?.dimensions?.height || 80}
                placeholder={
                  companyLogo?.asset?.metadata?.lqip ? "blur" : undefined
                }
                blurDataURL={companyLogo?.asset?.metadata?.lqip || ""}
                className="h-16 md:h-20 w-auto object-contain"
                quality={100}
              />
            </div>
          )}
          {tagLine && (
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {tagLine}
            </div>
          )}
          {title && (
            <h2 className="text-3xl md:text-5xl px-6 md:px-12 py-6 md:py-8 mb-8">
              {title}
            </h2>
          )}
        </div>
        {heroImage && heroImage.asset?._id && (
          <div className="mb-8 flex justify-center">
            <Image
              src={urlFor(heroImage).width(1920).height(1280).url()}
              alt={heroImage.alt || ""}
              width={960}
              height={640}
              placeholder={
                heroImage?.asset?.metadata?.lqip ? "blur" : undefined
              }
              blurDataURL={heroImage?.asset?.metadata?.lqip || ""}
              className="rounded-xl w-full max-w-[960px] aspect-[3/2] h-auto object-cover"
              quality={100}
            />
          </div>
        )}
        {description && description.length > 0 && (
          <div
            className={cn(
              "pt-8 md:pt-12 text-left text-muted-foreground [&_strong]:text-foreground [&_h1]:text-muted-foreground [&_h2]:text-muted-foreground [&_h3]:text-muted-foreground [&_h4]:text-muted-foreground",
              colorVariant === "primary"
                ? "text-background/80 [&_strong]:text-background [&_h1]:text-background/80 [&_h2]:text-background/80 [&_h3]:text-background/80 [&_h4]:text-background/80"
                : undefined,
            )}
          >
            <PortableTextRenderer value={description} />
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
