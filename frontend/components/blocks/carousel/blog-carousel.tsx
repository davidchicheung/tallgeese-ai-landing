import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
import PostCard from "@/components/ui/post-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  CarouselCounter,
} from "@/components/ui/carousel";
import { fetchSanityPosts } from "@/sanity/lib/fetch";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

const POSTS_LIMIT = 4;

type BlogCarouselBlock = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "blog-carousel" }
>;

export default async function BlogCarousel({
  padding,
  colorVariant,
  title,
  linkLabel,
  indicators = "dots",
}: BlogCarouselBlock) {
  const posts = (await fetchSanityPosts()).slice(0, POSTS_LIMIT);

  if (posts.length === 0) return null;

  const isPrimary = colorVariant === "primary";

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      {(title || linkLabel) && (
        <div className="flex items-end justify-between gap-4 mb-6">
          {title && (
            <h3
              className={cn(
                "text-3xl md:text-4xl font-bold",
                isPrimary ? "text-background" : undefined,
              )}
            >
              {title}
            </h3>
          )}
          {linkLabel && (
            <Link
              href="/blog"
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium hover:underline",
                isPrimary ? "text-background" : "text-foreground",
              )}
            >
              {linkLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
      <Carousel opts={{ slidesToScroll: "auto" }}>
        <CarouselContent>
          {posts.map((post) => (
            <CarouselItem
              key={post?.slug?.current}
              className="basis-full md:basis-1/2"
            >
              <Link
                href={`/blog/${post?.slug?.current}`}
                className="group flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <PostCard
                  title={post?.title ?? ""}
                  image={post?.image ?? null}
                  category={post?.categories?.[0]?.title ?? null}
                  publishedAt={post?.publishedAt ?? null}
                />
              </Link>
            </CarouselItem>
          ))}
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
