import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { POSTS_QUERY_RESULT } from "@/sanity.types";

type PostCardResult = NonNullable<POSTS_QUERY_RESULT[number]>;

interface PostCardProps
  extends Pick<PostCardResult, "title" | "image" | "publishedAt"> {
  className?: string;
  category?: string | null;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatDate(value?: string | null) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return dateFormatter.format(d);
}

export default function PostCard({
  className,
  title,
  image,
  category,
  publishedAt,
}: PostCardProps) {
  const formattedDate = formatDate(publishedAt);

  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden transition ease-in-out group",
        className,
      )}
    >
      {image && image.asset?._id && (
        <div className="mb-4 relative aspect-[3/2] rounded-2xl overflow-hidden">
          <Image
            src={urlFor(image).url()}
            alt={image.alt || ""}
            placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
            blurDataURL={image?.asset?.metadata?.lqip || ""}
            fill
            style={{
              objectFit: "cover",
            }}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            quality={100}
          />
        </div>
      )}
      {(category || formattedDate) && (
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-2">
          {category && (
            <span className="font-semibold text-primary">{category}</span>
          )}
          {category && formattedDate && <span aria-hidden>•</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      )}
      {title && (
        <h3 className="font-bold text-[1.25rem] leading-[1.3] group-hover:text-primary group-hover:underline underline-offset-4 transition-colors">
          {title}
        </h3>
      )}
    </div>
  );
}
