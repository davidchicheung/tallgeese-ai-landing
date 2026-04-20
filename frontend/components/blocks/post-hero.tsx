import Image from "next/image";
import PostDate from "@/components/post-date";
import CopyLinkButton from "@/components/blog/copy-link-button";
import { Badge } from "@/components/ui/badge";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERY_RESULT } from "@/sanity.types";

type PostHeroProps = NonNullable<POST_QUERY_RESULT>;

export default function PostHero({
  title,
  author,
  image,
  publishedAt,
  categories,
  _createdAt,
}: PostHeroProps) {
  return (
    <>
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(
            (category) =>
              category?.title && (
                <Badge key={category.slug ?? category.title} variant="secondary">
                  {category.title}
                </Badge>
              ),
          )}
        </div>
      )}
      {title && <h1 className="mb-4 md:mb-6 text-3xl lg:text-5xl">{title}</h1>}
      {image && image.asset?._id && (
        <div className="my-4 md:my-6 rounded-2xl overflow-hidden">
          <Image
            src={urlFor(image).quality(100).url()}
            alt={image.alt || ""}
            placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
            blurDataURL={image.asset?.metadata?.lqip || undefined}
            width={image.asset?.metadata?.dimensions?.width || 1200}
            height={image?.asset?.metadata?.dimensions?.height || 630}
            quality={100}
          />
        </div>
      )}
      <div className="flex items-center justify-between gap-2 text-sm md:text-base">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center gap-2">
            {author?.image && author.image.asset?._id && (
              <div className="relative w-6 h-6 md:w-10 md:h-10">
                <Image
                  src={urlFor(author.image).url()}
                  alt={author.image.alt ? author.image.alt : ""}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  placeholder={
                    author.image.asset?.metadata?.lqip ? "blur" : undefined
                  }
                  blurDataURL={author.image.asset?.metadata?.lqip || undefined}
                  sizes="40px"
                  className="w-10 h-10 rounded-full mr-2"
                />
              </div>
            )}
            {author?.name && <div>{author.name}</div>}
            <div className="hidden md:block">•</div>
          </div>
          <PostDate date={(publishedAt || _createdAt) as string} />
        </div>
        <CopyLinkButton />
      </div>
      <hr className="my-4 md:my-6 border-primary/30" />
    </>
  );
}
