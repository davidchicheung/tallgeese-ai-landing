import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { FEATURED_POST_QUERY_RESULT } from "@/sanity.types";

type FeaturedPostProps = NonNullable<FEATURED_POST_QUERY_RESULT>;

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

export default function FeaturedPost({
  title,
  slug,
  image,
  publishedAt,
  categories,
}: FeaturedPostProps) {
  const category = categories?.[0]?.title ?? null;
  const formattedDate = formatDate(publishedAt);
  const href = slug?.current ? `/blog/${slug.current}` : "#";

  return (
    <Link
      href={href}
      className="group block mb-12 rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        {image && image.asset?._id && (
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
            <Image
              src={urlFor(image).url()}
              alt={image.alt || ""}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              fill
              style={{ objectFit: "cover" }}
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={100}
              priority
            />
          </div>
        )}
        <div>
          <div className="inline-block mb-3 text-xs font-bold uppercase tracking-wider text-primary">
            Featured{category ? ` • ${category}` : ""}
          </div>
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
              {title}
            </h2>
          )}
          {formattedDate && (
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
