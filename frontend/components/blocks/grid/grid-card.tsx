import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT, ColorVariant } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>>[number];
type GridCard = Extract<GridColumn, { _type: "grid-card" }>;

interface GridCardProps extends Omit<GridCard, "_type" | "_key"> {
  color?: ColorVariant;
}

const iconColorStyles: Record<string, string> = {
  blue: "bg-blue-100 border-blue-200 text-blue-600 dark:bg-blue-500/20 dark:border-blue-500/30 dark:text-blue-400",
  indigo: "bg-indigo-100 border-indigo-200 text-indigo-600 dark:bg-indigo-500/20 dark:border-indigo-500/30 dark:text-indigo-400",
  purple: "bg-purple-100 border-purple-200 text-purple-600 dark:bg-purple-500/20 dark:border-purple-500/30 dark:text-purple-400",
  green: "bg-green-100 border-green-200 text-green-600 dark:bg-green-500/20 dark:border-green-500/30 dark:text-green-400",
  red: "bg-red-100 border-red-200 text-red-600 dark:bg-red-500/20 dark:border-red-500/30 dark:text-red-400",
  orange: "bg-orange-100 border-orange-200 text-orange-600 dark:bg-orange-500/20 dark:border-orange-500/30 dark:text-orange-400",
  teal: "bg-teal-100 border-teal-200 text-teal-600 dark:bg-teal-500/20 dark:border-teal-500/30 dark:text-teal-400",
  pink: "bg-pink-100 border-pink-200 text-pink-600 dark:bg-pink-500/20 dark:border-pink-500/30 dark:text-pink-400",
};

export default function GridCard({
  color,
  icon,
  iconColor,
  title,
  excerpt,
  image,
  link,
  hasLink: hasLinkField,
}: GridCardProps) {
  const hasLink = hasLinkField !== false && link?.href;

  const cardContent = (
    <div
      className={cn(
        "flex w-full flex-col justify-between overflow-hidden transition ease-in-out border rounded-3xl p-4",
        hasLink &&
          (color === "primary"
            ? "group-hover:border-primary-foreground/50"
            : "group-hover:border-primary"),
      )}
    >
      <div>
        {icon?.svg && (
          <div
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center mb-6 border [&>svg]:!w-8 [&>svg]:!h-8",
              iconColorStyles[iconColor || "blue"],
            )}
            dangerouslySetInnerHTML={{ __html: icon.svg }}
          />
        )}
        {image && image.asset?._id && (
          <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(image).url()}
              alt={image.alt || ""}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
              quality={100}
            />
          </div>
        )}
        <div
          className={cn(color === "primary" ? "text-background" : undefined)}
        >
          {title && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-2xl">{title}</h3>
            </div>
          )}
          {excerpt && <p>{excerpt}</p>}
        </div>
      </div>
      {hasLink && (
        <Button
          className="mt-6"
          size="lg"
          variant={link?.buttonVariant}
          asChild
        >
          <div>{link?.title ?? "Learn More"}</div>
        </Button>
      )}
    </div>
  );

  if (hasLink) {
    return (
      <Link
        key={title}
        className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
        href={link.href!}
        target={link?.target ? "_blank" : undefined}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div key={title} className="flex w-full rounded-3xl">
      {cardContent}
    </div>
  );
}
