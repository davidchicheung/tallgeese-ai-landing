import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import SectionContainer from "@/components/ui/section-container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  CarouselCounter,
} from "@/components/ui/carousel";
import { fetchSanityPagesByParent } from "@/sanity/lib/fetch";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

const CAROUSEL_SIZES = {
  one: "basis-full",
  two: "basis-full md:basis-1/2",
  three: "basis-full md:basis-1/2 lg:basis-1/3",
} as const;

const IMAGE_SIZES = {
  one: "h-[30rem] sm:h-[40rem] lg:h-[31.25rem] xl:h-[35rem]",
  two: "h-[22rem] md:h-[18rem] lg:h-[22rem] xl:h-[26rem]",
  three: "h-[18rem] md:h-[14rem] xl:h-[18rem]",
} as const;

type CarouselSize = keyof typeof CAROUSEL_SIZES;

type PageCarouselBlock = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "page-carousel" }
>;

interface PageCarouselProps extends PageCarouselBlock {
  currentSlug?: string;
}

export default async function PageCarousel({
  padding,
  colorVariant,
  title,
  linkLabel,
  parent,
  size = "three",
  indicators = "none",
  imageHoverZoom = "off",
  cardStyle = "default",
  currentSlug,
}: PageCarouselProps) {
  if (!parent) return null;

  const pages = await fetchSanityPagesByParent({
    parent,
    excludeSlug: currentSlug ?? "",
  });

  if (!pages || pages.length === 0) return null;

  const resolvedSize = (size ?? "three") as CarouselSize;
  const isPrimary = colorVariant === "primary";
  const isOverlay = cardStyle === "image-overlay";

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      {title && (
        <h3
          className={cn(
            "mb-5",
            isPrimary ? "text-background" : undefined,
          )}
        >
          {title}
        </h3>
      )}
      <Carousel>
        <CarouselContent>
          {pages.map((page) => {
            const href = page.parent
              ? `/${page.parent}/${page.slug}`
              : `/${page.slug}`;
            const image = page.meta?.image;

            if (isOverlay) {
              return (
                <CarouselItem
                  key={page._id}
                  className={CAROUSEL_SIZES[resolvedSize]}
                >
                  <Link
                    href={href}
                    className={cn(
                      "group relative block w-full overflow-hidden rounded-3xl bg-muted ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      IMAGE_SIZES[resolvedSize],
                    )}
                  >
                    {image && image.asset?._id && (
                      <Image
                        className={cn(
                          "object-cover",
                          imageHoverZoom === "on"
                            ? "transition-transform duration-300 group-hover:scale-105"
                            : undefined,
                        )}
                        src={urlFor(image).url()}
                        alt={page.title || ""}
                        fill
                        placeholder={
                          image.asset?.metadata?.lqip ? "blur" : undefined
                        }
                        blurDataURL={image.asset?.metadata?.lqip || ""}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        quality={100}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      {page.title && (
                        <h3 className="text-2xl font-bold">{page.title}</h3>
                      )}
                      {page.meta?.description && (
                        <p className="mt-2 text-white/80">
                          {page.meta.description}
                        </p>
                      )}
                      {linkLabel && (
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                          {linkLabel}
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      )}
                    </div>
                  </Link>
                </CarouselItem>
              );
            }

            return (
              <CarouselItem
                key={page._id}
                className={CAROUSEL_SIZES[resolvedSize]}
              >
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-muted p-4 transition ease-in-out ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {image && image.asset?._id && (
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-2xl mb-4",
                        IMAGE_SIZES[resolvedSize],
                      )}
                    >
                      <Image
                        className={cn(
                          "object-contain",
                          imageHoverZoom === "on"
                            ? "transition-transform duration-300 group-hover:scale-105"
                            : undefined,
                        )}
                        src={urlFor(image).url()}
                        alt={page.title || ""}
                        fill
                        placeholder={
                          image.asset?.metadata?.lqip ? "blur" : undefined
                        }
                        blurDataURL={image.asset?.metadata?.lqip || ""}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        quality={100}
                      />
                    </div>
                  )}
                  {page.title && (
                    <h3
                      className={cn(
                        "text-2xl font-bold",
                        isPrimary ? "text-background" : undefined,
                      )}
                    >
                      {page.title}
                    </h3>
                  )}
                  {page.meta?.description && (
                    <p
                      className={cn(
                        "mt-2 text-muted-foreground",
                        isPrimary ? "text-background/80" : undefined,
                      )}
                    >
                      {page.meta.description}
                    </p>
                  )}
                  {linkLabel && (
                    <div
                      className={cn(
                        "mt-auto pt-6 inline-flex items-center gap-2 text-sm font-medium",
                        isPrimary ? "text-background" : "text-foreground",
                      )}
                    >
                      {linkLabel}
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  )}
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex items-center mt-12">
          {indicators && indicators !== "none" && (
            <div className="flex-1 flex justify-center">
              {indicators === "dots" && <CarouselDots />}
              {indicators === "count" && <CarouselCounter />}
            </div>
          )}
          <div className="flex gap-2 ml-auto">
            <CarouselPrevious
              variant="secondary"
              className="static top-auto left-auto right-auto translate-y-0"
            />
            <CarouselNext
              variant="secondary"
              className="static top-auto left-auto right-auto translate-y-0"
            />
          </div>
        </div>
      </Carousel>
    </SectionContainer>
  );
}
