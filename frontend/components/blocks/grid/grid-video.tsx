import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import { dictionary } from "@/lib/dictionary";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>>[number];
type GridVideo = Extract<GridColumn, { _type: "grid-video" }>;

type GridVideoProps = Omit<GridVideo, "_type" | "_key"> & { lang?: string };

// The id from a youtu.be/<id>, watch?v=<id>, /shorts/<id> or /embed/<id> link.
function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}

export default function GridVideo({
  url,
  category,
  title,
  excerpt,
  image,
  lang,
}: GridVideoProps) {
  if (!url) return null;

  const text = dictionary(lang);

  const id = youtubeId(url);
  const thumbnail = image?.asset?._id
    ? urlFor(image).url()
    : id
      ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      : null;

  return (
    <a
      className="group flex w-full flex-col overflow-hidden rounded-3xl border bg-card ring-offset-background transition ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transform-none"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text.watchOnYouTube(title ?? "")}
    >
      <div className="relative grid aspect-video place-items-center overflow-hidden border-b bg-linear-to-br from-muted to-border">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={image?.alt || ""}
            placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
            blurDataURL={image?.asset?.metadata?.lqip || ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            quality={100}
          />
        )}
        <span
          aria-hidden="true"
          className="relative grid size-15 place-items-center rounded-full bg-neutral-900/90 text-white shadow-lg shadow-black/20 transition-transform group-hover:scale-110 motion-reduce:transform-none"
        >
          <Play className="ml-0.5 size-5 fill-current" />
        </span>
        <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1 rounded-md border bg-card px-2 py-1 text-[11px] font-semibold text-foreground/80">
          YouTube <ArrowUpRight className="size-3" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        {category && (
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            {category}
          </p>
        )}
        {title && (
          <h3 className="text-lg font-bold leading-snug tracking-tight">
            {title}
          </h3>
        )}
        {excerpt && (
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {excerpt}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[13px] font-bold">
          {text.watchWalkthrough} <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </a>
  );
}
