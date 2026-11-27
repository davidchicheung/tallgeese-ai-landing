import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import { dictionary } from "@/lib/dictionary";
import GridVideoPlayer from "./grid-video-player";

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
    <div className="group flex w-full flex-col overflow-hidden rounded-3xl border bg-card transition ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 motion-reduce:transform-none">
      <div className="relative grid aspect-video place-items-center overflow-hidden border-b bg-linear-to-br from-muted to-border">
        {id && thumbnail && (
          <GridVideoPlayer
            id={id}
            title={title ?? ""}
            playLabel={text.playVideo(title ?? "")}
            thumbnail={thumbnail}
            thumbnailAlt={image?.alt || ""}
            lqip={image?.asset?.metadata?.lqip}
          />
        )}
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
        <p className="mt-auto pt-5">
          <a
            className="inline-flex items-center gap-1 rounded-sm text-[13px] font-bold ring-offset-background hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={text.watchOnYouTube(title ?? "")}
          >
            {text.openOnYouTube} <ArrowUpRight className="size-3.5" />
          </a>
        </p>
      </div>
    </div>
  );
}
